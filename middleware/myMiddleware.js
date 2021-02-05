export default function (ctx) {
  if(ctx.route.fullPath == '/') ctx.redirect(301, '/all/1')
}
  