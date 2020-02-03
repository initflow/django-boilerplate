<template>
    <div class="common-ckeditor">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'common-ckeditor',
};
</script>

<style scoped lang="less">
@import "~theme";

.common-ckeditor {
    font-size: 1.3rem !important;
    font-family: "Open Sans", sans-serif !important;
    line-height: 2 !important;
    > * {
        font-size: 1.3rem !important;
        font-family: "Open Sans", sans-serif !important;
        line-height: 2 !important;
        white-space: normal !important;
    }
    p {
        margin-bottom: 30px;
        margin-left: -1px;
    }
    ul {
        padding: 0;
        margin-bottom: 40px;

        list-style-type: disc;
        list-style-position: inside;
    }
    ol {
        padding: 0;
        margin-bottom: 40px;

        list-style-position: inside;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-bottom: 12px;
        margin-left: -3px;

        font-size: 2.4rem !important;
        font-weight: normal !important;
        line-height: 4rem !important;
    }
    @media @media-md-down {
        p {
            margin-bottom: 40px;
        }
        ul {
            padding-left: 15px;

            line-height: 1.4 !important;

            list-style-position: outside;

            li {
                padding-left: 4px;
                margin-bottom: 14px;
            }
        }
        ol {
            padding-left: 15px;

            line-height: 1.4 !important;

            list-style-position: outside;

            li {
                padding-left: 4px;
                margin-bottom: 14px;
            }
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            margin-bottom: 19px;
            margin-left: -1px;

            font-size: 2.8rem !important;
            line-height: 3.2rem !important;
        }
    }
}
</style>
