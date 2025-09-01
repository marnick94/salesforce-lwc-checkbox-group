import { LightningElement, api } from 'lwc';

export default class CheckboxGroup extends LightningElement {
    @api label = '';
    @api readOnly = false;
    @api required = false;
    @api multiple = false;
    @api messageWhenValueMissing = 'Complete this field.';

    validity = true;
    showError = false;
    customValidityErrorMsg = "";
    checkboxes = [];
    _variant = 'label-stacked';

    renderedCallback() {
        this.checkboxes.forEach((checkbox) => {
            checkbox.readOnly = this.readOnly;
        });
    }

    get errorMessage() {
        return this.customValidityErrorMsg ? this.customValidityErrorMsg : this.messageWhenValueMissing;
    }

    get formElementClass() {
        let classes = 'slds-form-element';
        classes += this.showError ? ' slds-has-error' : '';
        classes += this.readOnly ? ' read-only' : '';
        return classes;
    }

    get showLabel() {
        return this.variant !== 'label-hidden';
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(value) {
        this._variant = ['label-stacked', 'label-hidden'].includes(value) ? value : 'label-stacked';
    }

    @api
    clear() {
        this.checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }

    @api
    blur() {
        this.checkboxes.forEach((checkbox) => {
            checkbox.blur();
        });
    }

    @api
    focus() {
        if(this.checkboxes.length > 0) {
            this.checkboxes[0].focus();
        }
    }

    @api
    checkValidity() {
        if(this.customValidityErrorMsg && !this.readOnly) {
            this.validity = false;
        } else {
            this.validity = this.checkboxes.reduce((acc, cb) =>  acc && cb.checkValidity(), true);
            
            if(this.required && !this.readOnly) {
                this.validity &= this.checkboxes.reduce((acc, cb) =>  acc || cb.checked, false);
            }
        }
        
        return this.validity;
    }
    
    @api
    reportValidity() {
        this.showError = !this.checkValidity();
        return this.validity;
    }

    @api
    setCustomValidity(message) {
        this.customValidityErrorMsg = message;
        this.reportValidity();
    }    

    handleChange = (event) => {
        if(!this.multiple && event.target.checked) {
            this.checkboxes.filter(cb => cb !== event.target).forEach(cb => cb.checked = false);
        }

        this.dispatchEvent(new CustomEvent("change", { detail: event.target }));
    }

    handleClick = (event) => {
        this.dispatchEvent(new CustomEvent("click", { detail: event.target }));
    }

    handleInput = (event) => {
        this.dispatchEvent(new CustomEvent("input", { detail: event.target }));
    }

    handleFocus = (event) => {
        this.dispatchEvent(new CustomEvent("focus", { detail: event.target }));
    }

    handleBlur = (event) => {
        this.reportValidity();
        this.dispatchEvent(new CustomEvent("blur", { detail: event.target }));
    }

    handleSlotChange(event) {
        const slot = event.target;

        this.checkboxes = slot.assignedNodes({ flatten: true }).filter(node => {
            if(node.tagName !== 'C-CHECKBOX') {
                slot.removeChild(node);
                return false;
            }

            return true;
        });

        this.checkboxes.forEach(cb => {
            cb.readOnly = this.readOnly;

            cb.removeEventListener('change', this.handleChange, true);
            cb.addEventListener('change', this.handleChange, true);

            cb.removeEventListener('click', this.handleClick, true);
            cb.addEventListener('click', this.handleClick, true);

            cb.removeEventListener('input', this.handleInput, true);
            cb.addEventListener('input', this.handleInput, true);

            cb.removeEventListener('focus', this.handleFocus, true);
            cb.addEventListener('focus', this.handleFocus, true);

            cb.removeEventListener('blur', this.handleBlur, true);
            cb.addEventListener('blur', this.handleBlur, true);
        });
    }
}