const { faWineBottle } = require('@fortawesome/free-solid-svg-icons')

const {app,BrowserWindow} = require('electron')

function createWindow(){
    const win = new BrowserWindow({
        width:800,
        height:800,
        webPerferences:{
            nodeIntegration:true
        }
    })
    win.loadURL()
}

app.whenReady().then(createWindow)

app.on('window-all-closed',()=>{
    if(process.platform!='darwin'){
        app.quit()
    }
})