<template>
  <form name="uploadForm">
    <div>
      <input id="uploadInput" type="file" name="myFiles" @change="updateSize"  webkitdirectory directory multiple>

    </div>
    <div v-for="(item, index) in files" :key="index" :data-id="index">
      file: <span>{{item.name}}</span>;
      size: <span>{{item.size+', '+item.width+', '+item.height}}</span>
    </div>

  </form>
</template>

<script>

export default {
	name: 'Files',
	data () {
		return {
			msg: 'Welcome to Your Vue.js App',
			files: [],
      info:[]
		}
	},
	methods: {
		init () {
			// document.getElementById("uploadInput").addEventListener("change", this.updateSize, false)

		},
		updateSize (event) {
			console.log(event.target.files)
      debugger

			let dirFiles = event.target.files
			this.files = dirFiles
      
			let _this = this
			for (let i = 0; i < dirFiles.length; i++) {
				let file = dirFiles[i]
				let info = {name: file.name, size: file.size}
				if (!file || file.type.indexOf('image/') !== 0) return

				let reader = new FileReader()

				reader.readAsDataURL(file)
				reader.onload = evt => {
				  // console.log('target:' + evt.target.result)

					let img = new Image()
					img.onload = () => {
						// this.image.width = img.width
						// this.image.height = img.height
						console.log('file is:' + file.name + ', ' + i)
						info.width = img.width
						info.height = img.height
						_this.files.push(info)
						console.log(_this.files)
					}
					// img.src = evt.target.result
				}

				// setTimeout(function(){
				//   this.files = dirFiles
				// }, 5000);

				reader.onerror = evt => {
					console.error(evt)
				}
			}

		},
		selectedFile () {
			this.imageLoaded = false
		}
	},
	mounted () {
		this.init()
	}
}
</script>

<style scoped>

</style>
