<template>
    <transition name="fade">
        <div class="modal-root"
            v-if="isActive"
            >
            <div class="modal-root__background"
                v-if="isBackgroundNeeded"
            />
            <transition-group name="scale-fade"
                v-on:leave="deactivate"
                appear
                >
                <div class="modal-root__item"
                    v-for="(modal, index) in list"
                    v-bind:key="index + modal.name"
                    v-bind:style="{ zIndex: index }"
                    >
                    <div class="modal-root__item-overlay"
                        v-if="!modal.props.noOverlay || list.length > 1"
                        v-bind:class="{
                            _clickable: !modal.props.noOverlayAction,
                        }"
                        v-on:click="!modal.props.noOverlay && !modal.props.noOverlayAction && close()"
                    />
                    <div class="modal-root__item-container">
                        <div class="modal-root__item-container-content"
                            v-bind:class="{ _shadowed: list.length > 1 && index > 0 }"
                            >
                            <component
                                v-bind:is="'modal-' + modal.name"
                                v-bind="modal.props"
                            />
                            <div class="modal-root__item-container-content-close"
                                v-if="!modal.props.noClose"
                                v-on:click="close"
                                >
                                <icon name="close" />
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'modal-root',
    data: () => ({
        isActive: false,
        isBackgroundNeeded: false,
        defaults: {
            player: {
                noClose: true,
                noOverlay: true,
            },
            loader: {
                noClose: true,
                noOverlayAction: true,
            },
        },
    }),
    computed: {
        list() {
            return this.$store.getters['modals/list'].map(m => {
                if (this.defaults[m.name] !== undefined) {
                    m.props = {
                        ...this.defaults[m.name],
                        ...m.props,
                    };
                }
                return m;
            });
        },
    },
    methods: {
        close() {
            this.$store.commit('modals/pop');
        },
        deactivate() {
            if (this.list.length === 0) {
                this.isActive = false;
            }
        },
    },
    watch: {
        list(newList, oldList) {
            const modalsAmountDifference = newList.length - oldList.length;
            if (modalsAmountDifference > 0) {
                this.$store.commit('common/modifyBodyFixedCounter', modalsAmountDifference);
                this.isActive = true;
                this.isBackgroundNeeded = !this.list.every(x => x.props.noOverlay);
            } else if (modalsAmountDifference < 0) {
                this.$store.commit('common/modifyBodyFixedCounter', modalsAmountDifference);
            }
        },
    },
};
</script>

<style scoped lang="less">
@import '~theme';

.modal-root {
    .transition-fade();

    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: @z-index-modal;
    &__background {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;

        background-color: fade(@color-gray-darkest, 25%);
    }
    &__item {
        .transition-scale-fade();

        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        &-overlay {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;

            &._clickable {
                cursor: pointer;
            }
        }
        &-container {
            position: absolute;
            top: 0;
            left: 0;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 100%;
            padding: 0 24px;
            overflow: auto;
            &:before,
            &:after {
                content: '';

                flex: 0 0 auto;
                display: block;
                height: 40px;

                pointer-events: none;
            }
            &-content {
                position: relative;
                z-index: 2;

                flex: 0 0 auto;
                &._shadowed {
                    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.5);
                }
                &-close {
                    position: absolute;
                    top: 12px;
                    right: 12px;

                    padding: 6px;

                    font-size: 2.4rem;

                    cursor: pointer;
                }
            }
        }
    }
    @media @media-md-down {
        &__item {
            &-container {
                padding: 0;
                &:before,
                &:after {
                    height: 0;
                }
                &-content {
                    flex: 1 1 auto;
                    width: 100%;
                    &-close {
                        top: 11px;
                        right: 6px;

                        font-size: 1.8rem;
                    }
                }
            }
        }
    }
}
</style>
