<template>
  <div>
    <el-upload
        action
        ref="upload"
        multiple
        :auto-upload="false"
        name="file"
        :file-list="fileList"
        :on-change="handleChangeFiles"
    >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>

    <el-button type="primary" @click="uploadFormSubmit()">确定</el-button>
  </div>
</template>
<script>
export default {
    data(){
        return {
            fileList:[]
        }
    },
    methods:{
        handleChangeFiles(file, fileList){
            this.fileList = fileList;
        },
        uploadFormSubmit(){
            let formData = new FormData();
            formData.append('id', this.id);  // 其他参数
            
            // 组合文件
            for (let i = 0; i < this.fileList.length; i++) {
                const file = this.fileList[i];
                formData.append('file', file.raw, file.name);
            }
            
            axios.post('/upload', formData)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }
}
</script>
