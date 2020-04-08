<template>
    <ui-input-base-text
        v-bind:on-input="formatValue"
        v-bind:is-invalid="isInvalid"
        v-bind="{ ...model }"
        v-bind:type="'tel'"
        v-on:input="inputHandler"
        inputmode="numeric"
        pattern="\\d*"
    />
</template>

<script>
export default {
    name: 'ui-input-phone',
    props: {
        model: {
            type: Object,
        },
        isInvalid: {
            type: Boolean,
            default: false,
        },
        value: {
            type: String,
        },
    },
    model: {
        prop: 'value',
        event: 'input',
    },
    computed: {
        areas() {
            return this.$store.getters['areas/items'];
        },
        currentAreaId() {
            return this.$store.getters['areas/currentId'];
        },
        currentArea() {
            if (this.currentAreaId === null || this.areas === null) {
                return null;
            }
            let result = null;
            for (let i = 0; i < this.areas.length; i++) {
                const country = this.areas[i];
                const cities = country.children;
                if (country.id === this.currentAreaId) {
                    result = country;
                    break;
                }
                for (let j = 0; j < cities.length; j++) {
                    const city = cities[j];
                    if (city.id === this.currentAreaId) {
                        result = city;
                        break;
                    }
                }
            }
            return result;
        },
    },
    methods: {
        formatValue(e) {
            let formattedValue = e.target.value;
            if (formattedValue.length === 0) {
                return;
            }
            if (this.currentArea !== null &&
                (this.currentArea.country.iso_3166_1_a2 === 'RU' ||
                this.currentArea.country.name === 'Россия')) {
                const first3 = formattedValue.substring(0, 3);
                if (first3[0] === '+' && first3[1] !== '7') {
                    formattedValue = `+7${formattedValue.substring(1, formattedValue.length - 1)}`;
                }
                formattedValue = formattedValue.substring(0, 1) + formattedValue.substring(1).replace(/\+./g, '');
                if (first3 === '8' || first3 === '7') {
                    formattedValue = '+7';
                }
                if (first3 === '+78' || first3 === '+77') {
                    formattedValue = `+7${formattedValue.substring(3)}`;
                }
                if (formattedValue.substring(0, 2) !== '+7') {
                    if (formattedValue[0] !== '+') {
                        formattedValue = `+${formattedValue}`;
                    }
                    if (formattedValue[1] !== '7') {
                        if (formattedValue[1] === '8') {
                            formattedValue = `+7${formattedValue.substring(1)}`;
                        } else {
                            formattedValue = `+7${formattedValue.substring(0)}`;
                        }
                    }
                }
                if (formattedValue.substring(0, 4) === '+7+7') {
                    formattedValue = `+7${formattedValue.substring(4)}`;
                }
                if (formattedValue.substring(0, 3) === '+78' && formattedValue.length >= 13) {
                    formattedValue = `+7${formattedValue.substring(3)}`;
                }
                formattedValue = `+${formattedValue.substring(1).replace(/[^0-9]/g, '').substring(0, 11)}`;
            } else {
                if (formattedValue[0] !== '+') {
                    formattedValue = `+${formattedValue}`;
                }
                formattedValue = formattedValue[0].replace(/[^0-9+]/g, '') + formattedValue.substring(1).replace(/[^0-9]/g, '');
            }
            e.target.value = formattedValue;
        },
        inputHandler(newValue) {
            this.$emit('input', newValue);
        },
    },
    mounted() {
        if (this.areas === null) {
            this.$store.dispatch('areas/getAreas');
        }
    },
};
</script>

<style scoped lang="less">
@import "~theme";
</style>
