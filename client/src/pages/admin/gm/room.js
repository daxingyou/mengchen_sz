import '../common.js'
import MyToastr from '../../../components/MyToastr.vue'
import MyPagination from '../../../components/MyPagination.vue'
import {Checkbox, Radio} from 'vue-checkbox-radio'

new Vue({
  el: '#app',
  components: {
    MyToastr,
    Checkbox,
    Radio,
    MyPagination,
  },
  data: {
    eventHub: new Vue(),
    rooms: {},      //可创建的房间
    roomType: {},   //每种房间对应的可用选项
    activeRoomType: '惠州庄',
    createRoomFormData: {
      'room': null,
      'rounds': null,
      'wanfa': [],
      'gui_pai': {},
      'ma_pai': null,
    },
    guiPaiData: {
      '花牌类型': null,
    },

    roomTypeApi: '/admin/api/gm/room/type',  //房间类型接口
    roomCreateApi: '/admin/api/gm/room',       //房间创建接口

  },

  methods: {
    displayOpenRoom () {
      console.log('display open room')
    },

    displayRoomHistory () {
      console.log('display room history')
    },

    refreshOpenRoomTable () {
      console.log('刷新正在玩表格')
    },

    refreshClosedRoomTable () {
      console.log('刷新房间历史表格')
    },

    createRoom (room) {
      this.createRoomFormData.room = room
      let toastr = this.$refs.toastr

      //鬼牌的选项的值传递到表单数据上
      for (let [type, value] of Object.entries(this.guiPaiData)) {
        if (value !== null) {
          this.createRoomFormData.gui_pai[type] = value
        }
      }

      axios({
        method: 'POST',
        url: this.roomCreateApi,
        data: this.createRoomFormData,
        validateStatus: function (status) {
          return status === 200 || status === 422
        },
      })
        .then(function (response) {
          if (response.status === 422) {
            toastr.message(JSON.stringify(response.data), 'error')
          } else {
            response.data.error
              ? toastr.message(response.data.error, 'error')
              : toastr.message(response.data.message)
          }
        })
        .catch(function (err) {
          alert(err)
        })
    },

    chunkWanfa () {   //玩法选项每行4个，格式化之
      for (let [room, options] of Object.entries(this.roomType)) {
        this.roomType[room]['wanfa'] = _.chunk(options['wanfa'], 4)
      }
    },
  },

  mounted () {
    let _self = this
    let toastr = this.$refs.toastr

    axios.get(this.roomTypeApi)
      .then(function (res) {
        _self.rooms = res.data.rooms
        _self.roomType = res.data.room_type
        _self.chunkWanfa()    //格式化玩法选项，方便循环，每行显示4个
      })
      .catch(function (err) {
        toastr.message(err, 'error')
      })
  },
})