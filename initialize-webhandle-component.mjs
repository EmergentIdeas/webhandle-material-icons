import createInitializeWebhandleComponent from "@webhandle/initialize-webhandle-component/create-initialize-webhandle-component.mjs"
import ComponentManager from "@webhandle/initialize-webhandle-component/component-manager.mjs"
import path from "node:path"

let initializeWebhandleComponent = createInitializeWebhandleComponent()


initializeWebhandleComponent.componentName = '@webhandle/material-icons'
initializeWebhandleComponent.componentDir = import.meta.dirname
initializeWebhandleComponent.defaultConfig = {
	"publicFilesPrefix": "/@webhandle/material-icons/files"
	, "provideResources": true
}
initializeWebhandleComponent.staticFilePaths = ['public']
initializeWebhandleComponent.templatePaths = ['views']

initializeWebhandleComponent.setup = async function(webhandle, config) {
	let manager = new ComponentManager()
	manager.config = config

	manager.addExternalResources = function(externalResourceManager) {
		let resource = {
			mimeType: 'text/css'
			, url: config.publicFilesPrefix + '/css/material-icons.css'
			, name: '@webhandle/material-icons/css'
			, cachable: webhandle.development ? false : true
		}
		externalResourceManager.includeResource(resource)

	}

	manager.provideExternalResources = function(externalResourceManager) {

		let resource = {
			mimeType: 'application/javascript'
			, url: config.publicFilesPrefix + '/js/load.mjs'
			, name: '@webhandle/material-icons'
			, resourceType: 'module'
			, cachable: webhandle.development ? false : true
		}
		externalResourceManager.provideResource(resource)

		resource = {
			mimeType: 'application/javascript'
			, name: '@webhandle/material-icons/configuration'
			, resourceType: 'module'
			, cachable: webhandle.development ? false : true
			, data: {publicFilesPrefix: config.publicFilesPrefix}
		}
		externalResourceManager.provideResource(resource)
	}
	
	if(config.provideResources) {
		webhandle.routers.preDynamic.use((req, res, next) => {
			manager.provideExternalResources(res.locals.externalResourceManager)
			next()
		})
	}
	
	let dir = 'public'
	manager.staticPaths.push(
		webhandle.addStaticDir(
			path.join(initializeWebhandleComponent.componentDir, dir),
			{
				urlPrefix: config.publicFilesPrefix
				, fixedSetOfFiles: true
			}
		)
	)

	return manager
}

export default initializeWebhandleComponent
