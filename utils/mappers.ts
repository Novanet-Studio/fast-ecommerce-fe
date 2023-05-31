/**
 * Transform the Strapi API response removing the not needed nesting
 * @param data object to mapping
 * @returns mapped object
 */

export function mapperData<T>(data: any): T {
  // Single
  if ($has(data, 'attributes')) {
    return mapperData(removeObjectKey(data, 'attributes'));
  }

  // collection
  if (isArray(data) && data.length && $has($first(data), 'attributes')) {
    return data.map((el: any) => mapperData(el)) as T;
  }

  // Fields
  $each(data, (value, key) => {
    if (!value) return;

    // single
    if (isObject(value)) {
      data[key] = mapperData(value);
    }

    // many
    if (isArray(value)) {
      data[key] = value.map((field) => mapperData(field));
    }

    // relation(s)
    if ($has(value, 'data')) {
      let relation = null;

      // single
      if (isObject(value.data)) {
        relation = mapperData(value.data);
      }

      // many
      if (isArray(value.data)) {
        relation = value.data.map((el: any) => mapperData(el));
      }

      data[key] = relation;
    }

    // single component
    if ($has(value, 'id')) {
      data[key] = mapperData(value);
    }

    // repeatable component & dynamic zone
    if (isArray(value) && $has($first(value), 'id')) {
      data[key] = value.map((p) => mapperData(p));
    }

    // single media
    if ($has(value, 'provider')) {
      return;
    }

    // multiple media
    if (isArray(value) && $has($first(value), 'provider')) {
      return;
    }
  });

  return data;
}

const removeObjectKey = <T extends { [key: string]: any }>(
  object: T,
  key: string
): T => ({
  id: object.id,
  ...object[key],
});
