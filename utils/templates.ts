type EmailTemplateParams = {
  name: string;
  quantity: number;
  price: number;
};

export const emailTemplate = ({
  name,
  quantity,
  price,
}: EmailTemplateParams) => `
<table
  border="0"
  cellpadding="0"
  cellspacing="0"
  align="center"
  width="100%"
  role="module"
  data-type="columns"
  style="padding: 0px 40px 0px 40px"
  bgcolor="#FFFFFF"
  data-distribution="1,1,1"
>
  <tbody>
  <tr role="module-content">
  <td height="100%" valign="top">
  <table
  width="173"
  style="
  width: 173px;
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0px 0px 0px 0px;
  "
  cellpadding="0"
  cellspacing="0"
  align="left"
  border="0"
  bgcolor=""
  class="column column-0"
  >
  <tbody>
  <tr>
  <td style="padding: 0px; margin: 0px; border-spacing: 0">
  <table
  class="module"
  role="module"
  data-type="text"
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  style="table-layout: fixed"
  data-muid="64573b96-209a-4822-93ec-5c5c732af15c.2"
  data-mc-module-version="2019-10-22"
  >
  <tbody>
  <tr>
  <td
  style="
  padding: 15px 0px 15px 0px;
  line-height: 22px;
  text-align: inherit;
  "
  height="100%"
  valign="top"
  bgcolor=""
  role="module-content"
  >
  <div>
  <div style="font-family: inherit; text-align: center">
  <span style="color: #80817f; font-size: 12px"
    >${name}
  </span>
  </div>
  <div></div>
  </div>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table
  width="173"
  style="
  width: 173px;
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0px 0px 0px 0px;
  "
  cellpadding="0"
  cellspacing="0"
  align="left"
  border="0"
  bgcolor=""
  class="column column-1"
  >
  <tbody>
  <tr>
  <td style="padding: 0px; margin: 0px; border-spacing: 0">
  <table
  class="module"
  role="module"
  data-type="text"
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  style="table-layout: fixed"
  data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1.2"
  data-mc-module-version="2019-10-22"
  >
  <tbody>
  <tr>
  <td
  style="
  padding: 15px 0px 15px 0px;
  line-height: 22px;
  text-align: inherit;
  "
  height="100%"
  valign="top"
  bgcolor=""
  role="module-content"
  >
  <div>
  <div style="font-family: inherit; text-align: center">
  <span style="color: #80817f; font-size: 12px"
    >${quantity}</span
  >
  </div>
  <div></div>
  </div>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table
  width="173"
  style="
  width: 173px;
  border-spacing: 0;
  border-collapse: collapse;
  margin: 0px 0px 0px 0px;
  "
  cellpadding="0"
  cellspacing="0"
  align="left"
  border="0"
  bgcolor=""
  class="column column-2"
  >
  <tbody>
  <tr>
  <td style="padding: 0px; margin: 0px; border-spacing: 0">
  <table
  class="module"
  role="module"
  data-type="text"
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  style="table-layout: fixed"
  data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1.1.1"
  data-mc-module-version="2019-10-22"
  >
  <tbody>
  <tr>
  <td
  style="
  padding: 15px 0px 15px 0px;
  line-height: 22px;
  text-align: inherit;
  "
  height="100%"
  valign="top"
  bgcolor=""
  role="module-content"
  >
  <div>
  <div style="font-family: inherit; text-align: center">
  <span style="color: #80817f; font-size: 12px"
    >$&nbsp;${price}</span
  >
  </div>
  <div></div>
  </div>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  <table
  class="module"
  role="module"
  data-type="divider"
  border="0"
  cellpadding="0"
  cellspacing="0"
  width="100%"
  style="table-layout: fixed"
  data-muid="c614d8b1-248a-48ea-a30a-8dd0b2c65e10.1.2"
  >
  <tbody>
  <tr>
  <td
  style="padding: 0px 40px 0px 40px"
  role="module-content"
  height="100%"
  valign="top"
  bgcolor=""
  >
  <table
  border="0"
  cellpadding="0"
  cellspacing="0"
  align="center"
  width="100%"
  height="1px"
  style="line-height: 1px; font-size: 1px"
  >
  <tbody>
  <tr>
  <td style="padding: 0px 0px 1px 0px" bgcolor="#80817f"></td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
</table>

`;
