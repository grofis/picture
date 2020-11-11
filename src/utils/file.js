const fs = require('fs')
// const path = require('path');
const time = require('./time')
const path = require('path')

const name = `./docs/${time.getFileDate()}.md`

function writeData (data) {
	console.log(`write data==>\r\n${data}`)
	fs.writeFile(name, data, 'utf8', (error) => {
		if (error) {
			console.log(error)
			return false
		}
		// console.log('写入成功');
		// console.log('__dirname : ' + __dirname)
		// console.log(fs.path)
	})
}

function logData (data) {
	// console.log(`log data==>\r\n${data}`);
	const fileName = `./logs/${time.getFileDate()}.log`
	fs.stat(fileName, (exists) => {
		if (!exists) {
			fs.writeFile(fileName, data, 'utf8', (e) => {
				console.log(e)
			})
		}
	})
}

exports.writeData = writeData
exports.logData = logData

exports.appendData = function (data) {
	fs.stat(name, (exists) => {
		if (!exists) {
  	  fs.writeFile(name, data, 'utf8', (e) => {
				console.log(e)
			})
		}
		fs.appendFile(name, data, 'utf8', (error) => {
			if (error) {
				console.log(error)
				return false
			}
		})
	})
}

// 遍历文件夹中的文件
exports.traverseDir = function traverseDir (dirPath, callback) {
	fs.readdir(dirPath, function (err, files) {
		if (err) {
			throw new Error(err)
		}
		files.forEach(function (name) {
			var filePath = path.join(dirPath, name)
			var stat = fs.statSync(filePath)
			if (stat.isFile()) {
				callback(name, stat)
			} else if (stat.isDirectory()) {
				traverseDir(filePath, callback)
			}
		})
	})
}
