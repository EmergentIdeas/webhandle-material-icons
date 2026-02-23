import setup from "../initialize-webhandle-component.mjs"

export default async function(webhandle) {
	let manager = await setup(webhandle)
	
	webhandle.routers.preDynamic.get('/auto-include', (req, res, next) => {
		manager.addExternalResources(res.locals.externalResourceManager)
		next()
	})
}