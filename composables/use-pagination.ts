interface DefaultValues {
  total?: number;
  perPage?: number;
  page?: number;
  pageCount?: number;
}

export interface CallbackParams {
  total: Ref<number>;
  perPage: Ref<number>;
  page: Ref<number>;
  pageCount: Ref<number>;
}

export interface CallbackReturn<T> {
  total: number;
  pageCount: number;
  data: T;
}

interface RestResponse<T> {
  changePage: (page: number) => void;
  data: Ref<T[]>;
}

type UsePaginationReturn<T> = CallbackParams & RestResponse<T>;

const TOTAL = 0;
const PER_PAGE = 5;
const PAGE = 1;
const PAGE_COUNT = 10;

export type PaginationCallback = (params: CallbackParams) => void;

function isAsync(fn: Function): boolean {
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]';
}

export default function usePagination<T>(
  callback: (
    params: CallbackParams
  ) => CallbackReturn<T> | Promise<CallbackReturn<T>>,
  params?: DefaultValues
): UsePaginationReturn<T> {
  const total = useState<number>('total', () => params?.total ?? TOTAL);
  const perPage = useState<number>(
    'perPage',
    () => params?.perPage ?? PER_PAGE
  );
  const page = useState<number>('page', () => params?.page ?? PAGE);
  const pageCount = useState<number>(
    'pageCount',
    () => params?.pageCount ?? PAGE_COUNT
  );
  const isLoading = useState<boolean>('isLoading', () => false);
  const data = useState<T[]>('data');

  function runCallback() {
    try {
      isLoading.value = true;

      if (isAsync(callback)) {
        (
          callback({
            total,
            perPage,
            page,
            pageCount,
          }) as Promise<CallbackReturn<T[]>>
        ).then((res) => {
          if (res == undefined || !res) return;

          data.value = res.data;
          total.value = res.total;
          pageCount.value = res.pageCount;
        });
      }
    } catch (error) {
      throw new Error(
        'An unexpected error occurred while executing the callback'
      );
    } finally {
      isLoading.value = false;
    }
  }

  function changePage(newPage: number) {
    page.value = newPage;
  }

  onMounted(() => {
    runCallback();
  });

  watch(page, (newPage) => {
    if (newPage > pageCount.value) return;

    page.value = newPage;
    runCallback();
  });

  return {
    data: data as Ref<T[]>,
    total,
    page,
    perPage,
    pageCount,
    changePage,
  };
}
