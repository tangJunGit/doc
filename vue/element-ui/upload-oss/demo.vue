<template>
  <div>
    <oss-upload :oss="oss" :url="imageUrl" :imageReg="uploadImageReg" @uploadSuccess="uploadSuccess"></oss-upload>
  </div>
</template>
<script>
import ossUpload from './oss-upload'
export default {
  data(){
    return {
      // 表单
      addForm: {
        imageUrl: ''
      },
      // oss参数
      oss: {
        bucketName: process.env.NODE_ENV === 'production' ? 'public-dev' : 'public-dev',  // 应用名 bucketName
        contentFolder: '/s105/fueloil/'   // 创建的文件夹路径
      },
      imageUrl: 'test.jpg',     // 初始化图片的地址
      // 限制上传的图片
      uploadImageReg: {
        type: /image\/\w+/, // 图片类型type正则
        maxSize: 10 * 1024 * 1024, // 限制图片的size  10M
        maxSizeText: '10M' // 图片大小的提示
      }
    }
  },
  methods: {
    // 上传成功
    uploadSuccess(data){
      this.addForm.imageUrl = data.urlWithoutAuthorization    //  urlWithoutAuthorization 为上传成功返回的图片地址
    }
  }
}
</script>
