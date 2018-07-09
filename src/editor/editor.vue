<template>
    <div class="external-components-wrapper">
        <or-collapsible title="Headers">
                <or-list addButtonLabel="add new field"  v-model="template.list" :new-item-method="listNewItemMethod" prettifyDrag>
                    <template scope="item">
                        <div class="pair">
                            <or-select-expression v-model="item.item.name" placeholder="Name"></or-select-expression>
                            <or-text-expression v-model="item.item.value" placeholder="Value"></or-text-expression>
                        </div>
                    </template>
                </or-list>
            <div class="email-wrapper">
                <email :schema="schema"
                    :label="template.emailLabel"
                    :placeholder="template.emailPlaceholder"
                    :$v="$v">
                </email>
            </div>
            <div class="password-wrapper">
                <password :schema="schema"
                        :label="template.passwordLabel"
                        :placeholder="template.passwordPlaceholder"
                        :$v="$v">
                </password>
            </div>
        </or-collapsible>
    </div>
    
</template>
<script>
    import * as _ from 'lodash';
    import {validators} from '_validators';
    import email from './email.vue';
    import password from './password.vue';

    const {required, jsExpressionNonEmptyString, generateValidators} = validators;

    export default {
        name       : 'editor-test-example',
        props      : ['template', 'schema', 'step', 'stepId', 'steps', 'readonly'],
        components : {email, password},
        computed   : {},

        created () {},

        data () {
            return {};
        },
        computed : {
            displayValue : {
                get () {
                    return _.get(this.schema, 'list', '');
                },
                set (newValue) {
                    this.schema.email = newValue;
                }
            }
        },
        methods : {
            listNewItemMethod() {
            return {
                name: '``',
                value:'``'
                }
            }
        },

        validations () {
            return {
                schema : validator(this.template)
            };
        }

    };

    export const data = (template) => ({
        list                : template.list,
        email               : '',
        emailPlaceholder    : template.emailPlaceholder,
        emailLabel          : template.emailLabel,
        password            : '',
        passwordPlaceholder : template.passwordPlaceholder,
        passwordLabel       : template.passwordLabel,
    });

    export const validator = (template) => {
        return {
            email    : generateValidators(template.validateRequired, {required}),
            password : generateValidators(template.validateRequired, {required}),
        };
    };

    export const meta = {
        name    : 'test-external-component',
        type    : 'onereach-studio-form-editor',
        version : '1.0'
    };
</script>

<style lang="scss" rel="stylesheet/scss">
.pair{
        display: flex;
        width: 100%;
        .or-select-expression{
            width: 40%;
        }
        .or-text-expression{
            width: 40%;
        }
    }
</style>

<style scoped lang="scss" rel="stylesheet/scss">
    @import '../scss/colors.scss';
</style>


<style lang="scss" rel="stylesheet/scss">
    @import '../scss/colors.scss';

</style>
