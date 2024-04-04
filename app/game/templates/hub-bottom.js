function f_hubBottomHTML(context) {
    let HTML = '';
    HTML += `
<div>
  <div class="hub-base-opts">
    <div class="h3">Base Model</div>
    <div id="hub_select" class="hub-select">
`;

    for (const hub_base of context['HUB_BASES']) {
    HTML += `
      <div id="hub_base_opt_` + hub_base.replace(' ', '_') + `" class="option-bg clickable">
        <div class="option-border">
          <div class="option-label">` + hub_base + `</div>
        </div>
      </div>
`;
    }

    HTML += `
    </div>
  </div>
</div>
`;
    return HTML;
}

export default f_hubBottomHTML;