<template>
    <div class="modal-common">
        <div class="modal-common__title"
            if="title"
            v-text="title"
        />
        <div class="modal-common__text"
            if="text"
            v-text="text"
        />
    </div>
</template>

<script>
export default {
    name: 'modal-common',
    props: {
        title: {
            type: String,
            default: null,
        },
        text: {
            type: String,
            default: null,
        },
    },
};
</script>

<style scoped lang="less">
@import '~theme';

.modal-common {
    .modal();

    text-align: center;
    &__title {
        margin-bottom: 10px;

        font-size: 2.4rem;
        line-height: 3.6rem;
    }
    &__text {
        max-width: 425px;
        margin: 0 auto;

        font-size: 1.3rem;
        line-height: 2.6rem;
    }

    @media @media-md-down {
        &__title {
            margin-bottom: 9px;
        }
        &__text {
            font-size: 1.2rem;
            line-height: 2rem;
        }
    }
}
</style>
