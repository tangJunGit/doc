<template>
    <div>
      <el-upload ref="upload" :action="upload_url" :upload_headers="upload_headers" :auto-upload="false" list-type="picture-card" accept="image/*" name="file" style="height: 160px;"
          :data="data" :file-list="fileList" :before-upload="beforeUpload" :on-preview="handlePreview" :on-success="uploadSuccess" :on-error="uploadError" :on-change="changeFile" :on-remove="removeFile">
          <i class="el-icon-plus"></i>
      </el-upload>
      <el-button size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'oss-upload',
  props: ['oss', 'url', 'imageReg', 'isUploadInit'],
  data () {
    return {
      upload_headers: '',
      upload_url: '',
      fileList: [],
      data: {},
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  activated () {
    this.upload_headers = {
      'token': this.$cookie.get('token')
    }
  },
  watch: {
    url (newValue) {
      if (newValue) {
        this.fileList = [{
          name: 'file',
          url: newValue
        }]
      } else {
        this.fileList = []
      }
    }
  },
  methods: {
    // 上传前先oss授权
    submitUpload () {
      if (!this.fileList.length) {
        this.$message.error('请选择图片再上传')
        return
      }
      this.$http({
        url: this.$http.adornUrl(`/base/common/authorizedUrl`),
        method: 'get',
        params: this.$http.adornParams({
          bucketName: this.oss.bucketName,
          fileFullName: this.oss.contentFolder
        })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.getPolicy()
        } else {
          this.data = {}
          this.$message.error('oss授权失败')
        }
      })
    },
    getPolicy () {
      // 获取oss上传参数，以及图片的信息，最后再上传图片
      let files = this.fileList[0]
      let point = files.name.lastIndexOf('.')
      let suffix = files.name.substr(point)

      this.$http({
        url: this.$http.adornUrl(`/base/common/policy`),
        method: 'get',
        params: this.$http.adornParams({
          bucketName: this.oss.bucketName,
          filePrefix: this.oss.contentFolder,
          fileTypeWithDot: suffix
        })
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.upload_url = data.data.host
          this.data = Object.assign({}, data.data, {
            success_action_status: 200,
            OSSAccessKeyId: data.data.accessid,
            url: data.data.urlWithoutAuthorization
          })
          this.$nextTick(() => {
            this.$refs.upload.submit()
          })
        } else {
          this.$message.error('获取oss上传参数失败')
        }
      })
    },
    changeFile (file, fileList) {
      this.fileList = [file]
    },
    removeFile (file, fileList) {
      this.fileList = []
    },
    handlePreview (file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    beforeUpload (file) {
      console.log(file)
      if (this.imageReg.type && !this.imageReg.type.test(file.type)) {
        this.$message.error('请选择图片类型')
        return false
      }

      if (file.size > this.imageReg.maxSize) {
        this.$message.error(`请选择小于${this.imageReg.maxSizeText}的图片`)
        return false
      }
    },
    uploadSuccess (response, file, fileList) {
      this.$emit('uploadSuccess', this.data)
      this.$message.success('上传成功')
    },
    uploadError (errorInfo, file, fileList) {
      this.$message.error('上传失败')
    }
  }
}
</script>
