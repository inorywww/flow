import request from "./request";

export function getGraph(id) {
  return request({
    url: '/graphs/' + id,
    method: 'get',
  })
}

export function addGraph() {
  return request({
    url: '/graphs/add',
    method: 'get',
  })
}

export function editGraph(id, data) {
  return request({
    url: '/graphs/edit/' + id,
    method: 'post',
    data
  })
}