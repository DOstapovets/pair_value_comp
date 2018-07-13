<template>
    <div class="external-components-wrapper">
        <or-collapsible title="Headers">
                <or-list ref="refList" addButtonLabel="add new field" :readonly="readonly" :steps="steps" :step-id="stepId" v-model="template.list" :new-item-method="listNewItemMethod" prettifyDrag>
                    <template scope="item">
                        <div class="pair">
                                <or-code class="code" mode="json" hideHeader v-if="isCode(item)" v-model="codeComputed"></or-code>   
                                <div class="pair" v-else>
                                    <or-text-expression class="name" disableCodeMode  disableVariables v-model="item.item.name" :readonly="readonly" :steps="steps" :step-id="stepId" placeholder="Name"></or-text-expression>
                                    <div class="value or-text-message">
                                        <div class="wrapper">
                                            <or-text-expression :ref="`itemValue${item.index}`" class="message-input" :readonly="readonly" :steps="steps" :step-id="stepId" v-model="item.item.value" placeholder="Value"></or-text-expression>
                                        </div>
                                    </div>
                                </div>    
                                <or-icon-button hasDropdown type="secondary" class="icon-more" icon="more_vert">
                                        <or-menu @select="selectMenu" slot="dropdown" has-icons :options="displayMenuOption(item)" raised></or-menu>
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
        watch:{
            'template.list':{
                handler(value){
                    this.schema.list = _.reduce(value, (obj,val)=> {
                        if(val.isCode){
                            obj[val.name]=obj.value;
                        }
                        return obj;
                    }, {});;
                }
            }
        },
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
            codeComputed:{
                get(){

                }
            }
        },
        methods : {
            isCode(item){
               return this.template.list[item.index].isCode
            },
            displayMenuOption(item){
                let index =item.index;
                   return [
                        {
                            label : `${this.template.list[index].isCode?"UI":"Code"} mode`,
                            icon  : 'code',
                            disabled : this.$refs[`itemValue${index}`]?!this.$refs[`itemValue${index}`].canStringify:false,
                            item 
                        },
                        {
                            label : 'Delete',
                            icon  : 'delete_forever',
                            item
                        }
                    ]
            },
            selectMenu(val){
                switch(val.label){
                    case "Delete":
                        this.$refs.refList.removeItem(val.item.index);
                        break;
                    default:
                        this.template.list[val.item.index].isCode=!this.template.list[val.item.index].isCode;
                }
            },
            listNewItemMethod() {
            return {
                name: '``',
                value:'``',
                isCode:false
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
        .code{
            width: 100%;
            padding: 10px;
        }
        .name{
            width: 50%;
            margin: 10px 3px 10px 10px;
            .header{
                display: none;
            }
        }
        .value{
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
        .full-screen{
            display: none;
        }
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
