method: 'POST',
path: '/user',
handler: controller.store

method: 'GET',
path: '/people',
handler: controller.getPeople

method: 'GET',
path: '/user/{id}',
handler: controller.getUserId

method: 'PUT',
path: '/user/{id}',
handler: controller.update

method: 'DELETE',
path: '/user/{id}',
handler: controller.remove