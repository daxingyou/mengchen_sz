import '../index.js'
import MyVuetable from '../../../components/MyVuetable.vue'
import FilterBar from '../../../components/MyFilterBar.vue'

new Vue({
  el: '#app',
  components: {
    MyVuetable,
    FilterBar,
  },
  data: {
    eventHub: new Vue(),
    tableUrl: '/agent/api/top-up/player',
    tableFields: [
      // {
      //   name: 'id',
      //   title: 'ID',
      //   sortField: 'id',
      // },
      // {
      //   name: 'provider.account',
      //   title: '发放者(此代理)',
      //   sortField: 'provider_id',
      // },
      {
        name: 'player',
        title: '玩家id',
        sortField: 'player',
      },
      {
        name: 'item.name',
        title: '类型',
        sortField: 'type',
      },
      {
        name: 'amount',
        title: '数量',
        sortField: 'amount',
      },
      {
        name: 'created_at',
        title: '时间',
      },
    ],
  },
})