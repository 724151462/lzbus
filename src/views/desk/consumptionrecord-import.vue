<template>
  <basic-container>
    <avue-form ref="form" :option="option" v-model="form" :upload-before="uploadBefore" :upload-after="uploadAfter"/>
  </basic-container>
</template>

<script>
  import {fileUpload} from "@/api/desk/consumptionrecord";

  export default {
    data() {
      return {
        form: {
          importType: '',
          consumptionFile: [],
          file: {},
        },
        option: {
          labelWidth: 120,
          menuBtn: false,
          column: [
            {
              label: '导入类型',
              prop: 'importType',
              type: 'select',
              dicUrl: `/api/blade-system/dict-biz/dictionary?code=import_type`,
              props: {
                label: "dictValue",
                value: "dictKey"
              },
              row: true,
              span: 12,
              dataType: "number",
              rules: [
                {
                  required: true,
                  message: '请选择导入类型',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '附件上传',
              prop: 'consumptionFile',
              type: 'upload',
              loadText: '附件上传中，请稍等',
              span: 24,
              propsHttp: {
                res: 'data'
              },
              tip: '请上传 excel文件',
              action: '/api/blade-desk/consumptionrecord/check-upload'
            },
          ]
        }
      }
    },
    methods: {
      uploadBefore(file, done) {
        this.$message.success('开始上传');
        this.file = file;
        done()
      },
      uploadAfter(res, done, loading) {
        if (!this.form.importType) {
          this.$message.warning('清先选择导入类型');
          loading()
          return false;
        }
        if (res.success) {
          fileUpload(this.form.importType,
            [this.file]
          ).then(res => {
            const data = res.data;
            if (data.success) {
              done()
            } else {
              this.$message.error(data.msg);
              loading()
            }
          })
        } else {
          this.$message.warning('请上传 excel 文件');
          loading()
          return false;
        }
      },
    }
  }
</script>
