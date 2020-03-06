<template>
    <component class="plugin-common-ticker"
        v-if="text"
        v-bind:is="href !== null ? 'a' : 'section'"
        v-bind:style="{
            color,
            backgroundColor,
        }"
        v-bind:href="href"
        >
        <div class="plugin-common-ticker__content"
            v-for="i in 2"
            v-bind:key="i"
            v-bind:style="{ animationDuration, animationDirection }"
            ref="content"
            >
            <div class="plugin-common-ticker__content-item"
                v-for="j in count"
                v-bind:key="j"
                v-text="text"
                ref="item"
            />
        </div>
    </component>
</template>

<script>
import utils from '~/utils';

export default {
    name: 'plugin-common-ticker',
    props: {
        text: {
            type: String,
            default: null,
        },
        href: {
            type: String,
            default: null,
        },
        color: {
            type: String,
            default: null,
        },
        backgroundColor: {
            type: String,
            default: null,
        },
        speed: {
            type: Number,
            default: 100, // px per sec
        },
    },
    data: () => ({
        count: 1,
        itemWidth: -1,
    }),
    computed: {
        animationDirection() {
            if (this.speed >= 0) {
                return 'normal';
            } else {
                return 'reverse';
            }
        },
        animationDuration() {
            if (this.speed === 0 || this.itemWidth === -1) {
                return '99999s';
            }
            return `${this.itemWidth * this.count / Math.abs(this.speed)}s`;
        },
    },
    methods: {
        init() {
            this.count = 1;
            this.$nextTick(() => {
                const containerWidth = this.$refs.content[0].offsetWidth;
                this.itemWidth = this.$refs.item[0].offsetWidth;
                this.count = Math.ceil(containerWidth / this.itemWidth) || 1;
            });
        },
    },
    mounted() {
        if (this.text === null) {
            return;
        }
        this.init();
        window.addEventListener('resize', this.init);
        utils.dom.addLoadedCallback(this.init);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.init);
        utils.dom.removeLoadedCallback(this.init);
    },
};
</script>

<style scoped lang="less">
@import '~theme';

.plugin-common-ticker {
    position: relative;

    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    padding: 10px 0;
    overflow: hidden;

    color: @color-gray-main;
    text-decoration: none;
    &__content {
        flex: 0 0 auto;
        display: flex;
        align-items: baseline;
        justify-content: flex-start;
        min-width: 100%;

        animation: plugin-common-ticker-animation 10s infinite linear;
        &-item {
            flex: 0 0 auto;
            padding: 0 20px;

            font-size: 6rem;
            font-weight: bold;
            letter-spacing: 3px;
            line-height: 8.2rem;
            text-transform: uppercase;
            white-space: nowrap;
        }
    }
    @media @media-md-down {
    }
}
@keyframes plugin-common-ticker-animation {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-100%);
    }
}
</style>
