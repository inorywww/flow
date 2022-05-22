import request from "./request";

export function getGraphs(type = 0) {
  return request({ // 0:all 1: history 2:del
    url: '/graphs',
    method: 'get',
    params: {
      type
    }
  })
}

export function getGraph(id) {
  return request({
    url: '/graphs/' + id,
    method: 'get',
    headers: {
      showLoading: true
    }
  })
}

export function addGraph(data) {
  return request({
    url: '/graphs/add',
    method: 'post',
    data
  })
}

export function editGraph(id, data) {
  return request({
    url: '/graphs/edit/' + id,
    method: 'post',
    data
  })
}

export function delOne(id, is_del = 0) {
  return request({
    url: '/graphs/delete/' + id,
    method: 'get',
    params: {
      is_del // 0：移到回收站 1:真删除
    }
  })
}

export function cloneFile(id, name) {
  return request({
    url: '/graphs/clone/' + id,
    method: 'get',
    params: {
      name
    }
  })
}

export function delAll() {
  return request({
    url: '/graphs/delete',
    method: 'get',
  })
}