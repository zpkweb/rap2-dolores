1: 获取文档模块
page: http://123.56.110.160:8181/index.do#/top/webPage/detail/PAGE/WELCOME

api: http://123.56.110.160:8181/front/webPage/detail.do?id=WELCOME&password=&visitCode=&
  
  Response: categorys{
    0: "技术文档"
    1: "开发计划"
    2: "项目设计文档"
    3: "数据库设计"
    4: "常用接口"
    5: "帮助文档"
  }
2：获取文档列表
page: http://123.56.110.160:8181/index.do#/top/webPage/list/ARTICLE/%E6%8A%80%E6%9C%AF%E6%96%87%E6%A1%A3
api: http://123.56.110.160:8181/front/webPage/list.do 
  POST: {
    type: ARTICLE
    moduleId: undefined
    category: 技术文档
    currentPage: 2
  }
  Response: data: [{
    id: 
  }]
3：获取文档详情
page: http://123.56.110.160:8181/index.do#/top/webPage/detail/ARTICLE/5cc2867b-d4b6-417b-a99c-c069641c491e
api: http://123.56.110.160:8181/front/webPage/detail.do?id=5cc2867b-d4b6-417b-a99c-c069641c491e&password=&visitCode=&
  Response: 