<template>
    <form class="ui-form"
        v-on:keydown.enter="submitHandler"
        v-on:submit.prevent="submitHandler"
        >
        <div class="ui-form__fields">
            <div class="ui-form__fields-item"
                v-for="(field, key) in model"
                v-bind:key="key"
                >
                <ui-form-field
                    v-bind:model="field"
                    v-bind:validation="getFieldValidation(key)"
                    v-bind:value="field.value"
                    v-on:input="(val) => modelUpdate(val, key)"
                />
            </div>
        </div>
    </form>
</template>

<script>
import utils from '~/utils';

export default {
    name: 'ui-form',
    props: {
        model: {
            type: Object,
            default: () => ({}),
        },
        validation: {
            type: Object,
            default: null,
        },
        validationPath: {
            type: String,
            default: 'fields',
        },
        submitHandler: {
            type: Function,
            default: () => ({}),
        },
    },
    model: {
        prop: 'model',
        event: 'update',
    },
    methods: {
        modelUpdate(val, key) {
            const newModel = { ...this.model };
            newModel[key].value = val;
            this.$emit('update', newModel);
        },
        getFieldValidation(key) {
            if (!this.validation) {
                return null;
            }
            return utils.common.getObjectValueByPath(this.validation, this.validationPath + '.' + key + '.value');
        },
    },
};
</script>

<style scoped lang="less">
@import '~theme';
.ui-form {
    &__fields {
        &-item {
            &:not(:last-child) {
                margin-bottom: 16px;
            }
        }
    }
}
</style>
