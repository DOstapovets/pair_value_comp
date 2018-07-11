<template>
    <div class="external-components-wrapper">
        {{schema}}
        {{template}}
        <or-collapsible title="Headers">
                <or-list ref="refList" addButtonLabel="add new field" :readonly="readonly" :steps="steps" :step-id="stepId" v-model="template.list" :new-item-method="listNewItemMethod" prettifyDrag>
                    <template scope="item">
                        <div class="pair">
                            <or-select-expression v-model="item.item.name" :readonly="readonly" :steps="steps" :step-id="stepId" placeholder="Name"></or-select-expression>
                                <div class="or-text-message">
                                    <div class="wrapper">
                                        <or-text-expression :ref="`itemValue${item.index}`" class="message-input" :readonly="readonly" :steps="steps" :step-id="stepId" v-model="item.item.value" placeholder="Value"></or-text-expression>
                                    </div>
                                </div>
                            <or-icon-button hasDropdown type="secondary" class="icon-more" icon="more_vert">
                                    <or-menu @select="selectMenu" slot="dropdown" has-icons :options="displayMenuOption(item.index)" raised></or-menu>
                            </or-icon-button>
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
            return {
                menuOptions:[
                {
                    label : 'Code mode',
                    icon  : 'code'
                },
                {
                    label : 'Delete',
                    icon  : 'delete_forever'
                }
                ],
                index:0
            };
        },
        computed : {
            displayMenuOption:{
                get(index){
                   return [
                        {
                            label : `${this.$refs[`itemValue${index}`].mode=="text"?"Code":"UI"} mode`,
                            icon  : 'code',
                            disabled : this.$refs[`itemValue${index}`].isStringExpression,
                            index 
                        },
                        {
                            label : 'Delete',
                            icon  : 'delete_forever',
                            index
                        }
                    ]
                }
            },
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
            // displayMenuOption(index){
            //     return [
            //     {
            //         label : `${this.$refs[`itemValue${index}`].mode=="text"?"Code":"UI"} mode`,
            //         icon  : 'code',
            //         disabled : this.$refs[`itemValue${index}`].isStringExpression,
            //         index 
            //     },
            //     {
            //         label : 'Delete',
            //         icon  : 'delete_forever',
            //         index
            //     }
            //     ]
            // },
            selectMenu(val){
                console.log(val);
                switch(val.label){
                    case "Delete":
                        this.$refs.refList.removeItem(val.index);
                        break;
                    default:
                        this.$refs[`itemValue${val.index}`].toggleMode();
                }
            },
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
    .external-components-wrapper{
        background: #F6F6F6;
    .pair{
        display: flex;
        width: 100%;
        align-items: center;
        background: white;
        .or-select-expression{
            width: 50%;
            margin: 10px 3px 10px 10px;
        }
        .or-text-message{

            width: 50%;
            margin: 10px 0;

        }
    }
    .or-text-message .wrapper{
         .message-input .input-wrapper .or-editable-wrapper{
             background: #f6f6f6;
         }
         .message-input {
            background: #f6f6f6;    
         }
        border-radius: 0;
        border: none;
        padding: 0;
    }
    .or-list-items{
        .remove-button{
            display: none;
        }
    }
    .icon-more{
        color: #A1A6AA;
    }
    }
</style>

<style scoped lang="scss" rel="stylesheet/scss">
    @import '../scss/colors.scss';
</style>


<style lang="scss" rel="stylesheet/scss">
    @import '../scss/colors.scss';

</style>
