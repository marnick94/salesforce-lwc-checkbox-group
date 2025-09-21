import { LightningElement, api } from 'lwc';

const DEFAULT_MESSAGE_WHEN_VALUE_MISSING = 'Complete this field.';

export default class CheckboxGroup extends LightningElement {
    _label = '';
    _readOnly = false;
    _required = false;
    _multiple = false;
    _validity = true;
    _showError = false;
    _customValidityErrorMsg = "";
    _messageWhenValueMissing = DEFAULT_MESSAGE_WHEN_VALUE_MISSING;
    _checkboxes = [];

    @api
    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    @api
    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        this._readOnly = !!value;
    }

    @api
    get required() {
        return this._required;
    }

    set required(value) {
        this._required = !!value;
    }

    @api
    get multiple() {
        return this._multiple;
    }

    set multiple(value) {
        this._multiple = !!value;
    }

    @api
    get messageWhenValueMissing() {
        return this._messageWhenValueMissing;
    }

    set messageWhenValueMissing(value) {
        this._messageWhenValueMissing = value ? value : DEFAULT_MESSAGE_WHEN_VALUE_MISSING;
    }

    @api
    clear() {
        this._checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }

    @api
    blur() {
        this._checkboxes.forEach((checkbox) => {
            checkbox.blur();
        });
    }

    @api
    focus() {
        if(this._checkboxes.length > 0) {
            this._checkboxes[0].focus();
        }
    }

    @api
    checkValidity() {
        if(this._customValidityErrorMsg && !this.readOnly) {
            this._validity = false;
        } else {
            this._validity = true;
            
            if(this.required && !this.readOnly) {
                this._validity &= this._checkboxes.reduce((acc, cb) =>  acc || cb.checked, false);
            }
        }
        
        return this._validity;
    }
    
    @api
    reportValidity() {
        this._showError = !this.checkValidity();
        return this._validity;
    }

    @api
    setCustomValidity(message) {
        this._customValidityErrorMsg = message;
        this.reportValidity();
    }

    renderedCallback() {
        this._checkboxes.forEach((cb) => {
            cb.bind(this);
        });
    }

    handleChange = (event) => {
        if(!this.multiple && event.target.checked) {
            this._checkboxes.filter(cb => cb !== event.target).forEach(cb => {
                cb.checked = false;
                this.dispatchEvent(new CustomEvent("change", { detail: cb }));
            });
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

        this._checkboxes = slot.assignedNodes({ flatten: true }).filter(node => {
            if(node.tagName !== 'C-CHECKBOX') {
                slot.removeChild(node);
                return false;
            }

            return true;
        });

        this._checkboxes.forEach(cb => {
            cb.bind(this);

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

    get errorMessage() {
        return this._customValidityErrorMsg ? this._customValidityErrorMsg : this.messageWhenValueMissing;
    }

    get formElementClass() {
        let classes = 'slds-form-element';
        classes += this._showError ? ' slds-has-error' : '';
        classes += this.readOnly ? ' read-only' : '';
        return classes;
    }

    get showLabel() {
        return !!this.label;
    }
}