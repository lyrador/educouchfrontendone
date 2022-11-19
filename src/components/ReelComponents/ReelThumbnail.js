import React, {useState, useRef} from 'react'
import styled from 'styled-components'
import AWS from 'aws-sdk'
import swal from 'sweetalert2'
import axios from 'axios';


AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_KEY  
});


const bucket = new AWS.S3({
    apiVersion: process.env.REACT_APP_API_VERSION,
    httpOptions: {timeout:0},
    params: {Bucket: "filesuploader"},
    region: process.env.REACT_APP_REGION
});


const  ReelThumbnail = (props) => {


    const [videofile, setVideofile] = useState('');
    const [progress, setProgress] = useState(0);
    const [editorText, setEditorText] = useState('');
    const [thumbnail, setThumail] = useState('');
    const [option, setoption] = useState(0);
    const [url, seturl] = useState('');


    const videoElem = useRef();


    const handle  = (e,n) => {

        setoption(n);

        var file = e.target.files[0];
        if(file === '' || file === undefined){
            swal.fire({text:`The file is   ${typeof image}`, icon:'error'});
        }else{
            if( file.type === "video/mp4"  && n === 1)
                       setVideofile(file);
            else{
                setVideofile(file);
            }

        }
                
    }




    const PostData =(e) => {
        e.preventDefault();

        if(e.target  !==  e.currentTarget){
            console.log("File returned")
            return;
        }

        var ts = Math.floor(Date.now()/1000);

        const file1 = option === 1 ? ts+videofile.name.replace(/ /g, '') :  ts+videofile.name;
        const file2 = editorText;
        const file3 = videofile;

        if(file1 !== '')
          SEND_THUMBNAIL(file1,file3,option);

          if(option === 1)
            sendDB(file1,ts+videofile.name.replace(/ /g, '').replace('mp4', "png"));
        else
             sendDB(file1,ts+videofile.name);

    }


 


  
    const SEND_THUMBNAIL = (args, data,option) => {
        if(option === 1){
            if(args.length > 0){
                let file = args.toString().replace(".mp4", ".png");
                const canvas = document.createElement("canvas");
                canvas.width = videoElem.current.videoWidth;
                canvas.height = videoElem.current.videoHeight;
                canvas.getContext("2d").drawImage(videoElem.current,0,0,videoElem.current.videoWidth,videoElem.current.videoHeight);
                SEND_TO_AWS_THUMBNAIL(file, datatoBlob(canvas.toDataURL()), data);
            }
        }else 
           SEND_TO_AWS_THUMBNAIL(args, data, "");
            
    }





    const SEND_TO_AWS_THUMBNAIL = (args,data,Videodata) => {


            const params = {
                ACL:process.env.REACT_APP_READ_RULE,
                Body:data,
                Bucket: "filesuploader",
                Key: process.env.REACT_APP_S3_THUMB_SECTION+args.toString().trim()
            }


            bucket.putObject(params)
            .on('httpUploadProgress', (e) => {
               setProgress(Math.round((e.loaded/ e.total)*100));
            })
            
            .on('httpDone', (e) => {
                console.log("Done uploading thumbnail...");
                CLOUD("https://filesuploader.s3.eu-west-3.amazonaws.com/"+process.env.REACT_APP_S3_THUMB_SECTION+args.toString().trim(),args)
                if(Videodata.toString().trim().length > 0)
                       SEND_VIDEOFILE(args,Videodata);
            })
            .send((err) => {
                if(err){
                    setProgress(0);
                    alert("Snap Error Occurred !")
                    console.log(err)
                }
            });


            
           
    }



    const  CLOUD = (url,publicid) => {
        console.log(publicid, "ID")
        let paylaod = {
            url:url,
            publicface:publicid
        }
        axios.post(process.env.REACT_APP_IMG_TRANSFOMATION,paylaod)
            .then(res => {
                console.log(res.data.message);
                }).catch(err =>{
                console.log(err);
            })
    }


    const SEND_VIDEOFILE = (args,videofile) => {
        const params = {
            ACL:process.env.REACT_APP_READ_RULE,
            Body:videofile,
            Bucket: "filesuploader",
            Key: process.env.REACT_APP_S3_VIDEO_SECTION+args.toString().replace(".png",".mp4").trim()
        }
        bucket.putObject(params)
        .on('httpUploadProgress', (e) => {
           setProgress(Math.round((e.loaded/ e.total)*100));
        })
        .on('httpDone', (e) => {
           swal.fire({text:"Uploaded Video", icon:'success'});
           
        }).send((err) => {
            if(err){
                setProgress(0);
                alert("Snap Error Occurred !")
                console.log(err)
            }
        });
    }










    const sendDB = (file1, file2) => {
        let payload = {
            UserPost:{
                video: file1,
                title: editorText,
                thumbnail: file2
            }
        }
        //console.log(payload);
        seturl(`https://filesuploader.s3.eu-west-3.amazonaws.com/Thumbnails/`+payload.UserPost.thumbnail);
    }



    function datatoBlob(dataUrl){
        let array, binary, i, len;
        binary = atob(dataUrl.split(',')[1]);
        array = [];
        i = 0;
        len = binary.length;
        while(i < len){
            array.push(binary.charCodeAt(i));
            i++;
        }

        return new Blob([new Uint8Array(array)], {
            type: "image/png"
        });
    };

    return (
         <Container>
              <video
                id='video'
                ref={videoElem}
                 src={videofile ? URL.createObjectURL(videofile) : ''}
                type="video/mp4"
                width="300"
                height="300"
                controls
              />
            <br/>
            <table>
                <tr>
                    <td>
                        <input placeholder='Enter text' value={editorText} 
                         onChange={(e)=> setEditorText(e.target.value)}/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <input type="file" name="image" id="file-input"
                         style={{display:"none"}}  onChange={(e) => handle(e,1)}  
                         accept='video/mp4, video/x-m4v, video/*'/>
                         <p><label  htmlFor='file-input' >Choose video file +</label></p>
                    </td>
                </tr>



                <tr>
                    <td>
                        <input type="file" name="image" id="file-input_1"
                         style={{display:"none"}}  onChange={(e) => handle(e,2)}  
                         accept='image/*'/>
                         <p><label  htmlFor='file-input_1' >Choose image file +</label></p>
                    </td>
                </tr>


                <tr>
                    <td>
                    <p><label onClick={(e)=> PostData(e)}>Upload  &nbsp; {progress}%</label></p>
                    </td>
                </tr>



                <tr>
                    <td>
                    <p>{`${url}`}</p>
                    </td>
                </tr>
            </table>
        </Container>
    )
}


const Container = styled.div`
label{
background: #f5f5f5;
border-radius:5px;
margin: 10px;
padding:10px;
}
`;


export default ReelThumbnail;