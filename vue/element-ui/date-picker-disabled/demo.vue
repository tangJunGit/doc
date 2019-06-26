<template>
  <div>
    <!--结束时间-->
    <el-date-picker v-model="form.data1" type="date" :picker-options="pickerData1"></el-date-picker>

    <!--开始时间 --- 结束时间-->
    <el-date-picker v-model="form.data2" type="date" :picker-options="pickerData2"></el-date-picker>


    <!--开始时间-->
    <el-date-picker v-model="form.data3" type="date" :picker-options="pickerData3"></el-date-picker>
  </div>
</template>
<script>
export default {
    data(){
        return {
            form:{
                data1: '',
                data2: '',
                data3: ''
            },
            pickerData1:this.datePicker('', 'data2'),
            pickerData2:this.datePicker('data1', 'data3'),
            pickerData3:this.datePicker('data2', '')
        }
    },
    methods: {
        datePicker(begin, end){
          let self = this;
          return {
            disabledDate(time){
              let _begin = begin ? self.form[begin] : '';
              let _end = end ? self.form[end] : '';
              if (_begin && _end) {
                return time.getTime() < new Date(_begin).getTime() - 1000*60*60*24 || time.getTime() > new Date(_end).getTime()
              }else if(_begin){
                return time.getTime() < new Date(_begin).getTime() - 1000*60*60*24
              }else if(_end){
                return time.getTime() > new Date(_end).getTime()
              }
            }
          }
        },
    }
}
</script>

