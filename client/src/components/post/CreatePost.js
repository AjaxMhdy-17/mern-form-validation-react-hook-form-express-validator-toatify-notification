import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "../Ui/Button";
import { createPost } from "../../redux/actions/postActions";

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState("");
  const [msg, setMsg] = useState("");
  const imgRef = useRef();

  const handleSubmitForm = (data) => {
    if (photo !== "" && photo !== undefined) {
      const format = photo.name.split(".");
      if (format[1] === "png" || format[1] === "jpg" || format[1] === "jpeg") {
        const imgData = new FormData();
        imgData.append("file", photo);
        imgData.append("upload_preset", "heroku-upload-practice");
        imgData.append("cloud_name", "doctog5my");
        fetch(`https://api.cloudinary.com/v1_1/doctog5my/image/upload`, {
          method: "post",
          body: imgData,
        })
          .then((res) => res.json())
          .then((imgData) => {
            reset();
            const postObj = {
              title: data.name,
              photo: imgData.url,
              tag: data.tag,
              desc: data.desc,
            };
            dispatch(createPost(postObj));
            setPhoto("");
          })
          .catch((err) => {
            // console.log(err);
          });
        setMsg("");
      }
    } else {
      const postObj = {
        title: data.name,
        photo: "https://cdn.wallpapersafari.com/1/39/rh5AKQ.jpg",
        tag: data.tag,
        desc: data.desc,
      };
      dispatch(createPost(postObj));
      setMsg("");
    }
  };

  return (
    <div className="container mx-auto relative">
      <div className="bg_img bg_create py-32 flex flex-col items-center justify-center text-center">
        <h3 className="text-5xl mb-10">Create Your Blog Post.</h3>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-7">
          <div>
            <h4>
              {errors.name && <span>please enter a Heading For This Post</span>}
            </h4>
            <input
              type="text"
              placeholder="Enter Post Name"
              {...register("name", {
                required: true,
              })}
              className="transition-all duration-300 w-full rounded-md focus:outline-none bg-transparent border focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent border-indigo-900 px-5 py-1 placeholder:text-indigo-900"
            />
          </div>
          <div>
            <h4>{msg !== "" ? msg : ""}</h4>
            <input
              type="file"
              placeholder="select photo"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="transition-all duration-300 w-full rounded-md focus:outline-none bg-transparent border focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent border-indigo-900 px-5 py-1 placeholder:text-indigo-900"
              ref={imgRef}
            />
          </div>
          <div>
            <select
              className="cursor-pointer bg-orange-500 text-white w-full  py-[3px] pl-3 pr-5 rounded-tr-full rounded-br-full md:w-1/2"
              {...register("tag", {
                required: true,
              })}
            >
              <option value="coding" className="bg-indigo-800">
                Coding
              </option>
              <option value="nature" className="bg-indigo-800">
                Nature
              </option>
              <option value="animal" className="bg-indigo-800">
                Animal
              </option>
              <option value="food" className="bg-indigo-800">
                Food
              </option>
              <option value="travel" className="bg-indigo-800">
                Travel
              </option>
            </select>
          </div>
          <div>
            <h4>
              {errors.desc && (
                <span>Please Enter Description For This Post</span>
              )}
            </h4>
            <textarea
              type="textarea"
              placeholder="Enter Post Name"
              {...register("desc", {
                required: true,
              })}
              className="transition-all duration-300 w-full rounded-md focus:outline-none bg-transparent border focus:border-t-transparent focus:border-r-transparent focus:border-l-transparent border-indigo-900 px-5 py-1 placeholder:text-indigo-900"
            />
          </div>
          <div>
            <Button type="submit">Create Your Post</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
