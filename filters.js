class FilterPicker {
  constructor(select, onChange) {
    this.id = select.id;
    this.label = select.closest('label').firstChild.textContent.trim();
    this.options = [...select.options].map(option=>({value:option.value,label:option.textContent}));
    this.values = [];
    this.onChange = onChange;
    this.element = document.createElement('fieldset');
    this.element.className = 'filter-picker';
    this.element.innerHTML = `<legend>${this.label}</legend><details><summary aria-label="${this.label} selections"><span class="filter-summary"></span><span aria-hidden="true">⌄</span></summary><div class="filter-panel" role="group" aria-label="${this.label} options"><div class="filter-options"></div><button type="button" data-clear>Clear selection</button></div></details>`;
    select.closest('label').replaceWith(this.element);
    this.details = this.element.querySelector('details');
    this.panel = this.element.querySelector('.filter-panel');
    this.summary = this.element.querySelector('summary');
    this.renderOptions();
    this.element.addEventListener('change',event=>{
      if (!event.target.matches('input')) return;
      const value = event.target.value;
      if (value === 'all') this.values = [];
      else this.values = event.target.checked ? [...this.values,value] : this.values.filter(item=>item!==value);
      this.onChange();
    });
    this.element.addEventListener('click',event=>{
      const button = event.target.closest('button');
      if (!button) return;
      if (button.hasAttribute('data-clear')) {
        this.values = [];
        this.onChange();
      }
    });
    this.details.addEventListener('toggle',()=>{
      if (!this.details.open) return;
      for (const other of document.querySelectorAll('.filter-picker details[open]')) {
        if (other !== this.details) other.open = false;
      }
      this.panel.style.left = '0px';
      const box = this.panel.getBoundingClientRect();
      const shift = Math.max(16-box.left,Math.min(0,document.documentElement.clientWidth-16-box.right));
      this.panel.style.left = shift+'px';
    });
    this.sync();
  }
  renderOptions() {
    this.element.querySelector('.filter-options').innerHTML = this.options.map(option=>
      `<label class="filter-option"><input type="checkbox" name="${this.id}-choice" value="${option.value}"><span>${option.label}</span></label>`).join('');
    this.sync();
  }
  sync() {
    const labels = this.options.filter(option=>this.values.includes(option.value)).map(option=>option.label);
    this.element.querySelector('.filter-summary').textContent = labels.length===0 ? this.options[0].label : labels.length===1 ? labels[0] : labels.length+' selected';
    this.summary.title = labels.join(', ') || this.options[0].label;
    for (const input of this.element.querySelectorAll('input')) {
      input.checked = input.value==='all' ? this.values.length===0 : this.values.includes(input.value);
    }
  }
  toggle(value) {
    this.values = this.values.includes(value) ? this.values.filter(item=>item!==value) : [...this.values,value];
  }
  close(focus=false) {
    this.details.open = false;
    if (focus) this.summary.focus();
  }
}

