<template lang="html">
  <div class="ps-footer__widgets">
    <aside class="widget widget_footer widget_contact-us">
      <div class="widget_content">
        <h3>{{ $t("footer.widgetHeading.contactUs") }}</h3>

        <ul class="ps-list--social">
          <li>
            <a
              class="general"
              href="https://www.instagram.com/farinebyvane/?hl=es"
            >
              <i class="fab fa-instagram"></i>
            </a>
            @farinebyvane
          </li>
          <li>
            <a class="general" href="#">
              <i class="fa fa-phone"></i>
            </a>
            412.319.48.27
          </li>
          <li>
            <a class="general" href="#">
              <i
                class="far fa-envelope
                        </a>"
              ></i>
            </a>
            vanessa@farinebyvane.com - farinebyvane@gmail.com
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: "FooterWidgets",
};
</script>

<style lang="scss" scoped></style>
