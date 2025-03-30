import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store=>store.auth);
  const {posts} = useSelector(store=>store.post);
  const dispatch = useDispatch();

  // Reset form state
  const resetForm = () => {
    setFile(null);
    setCaption("");
    setImagePreview("");
    setLoading(false);
  };

  const fileChangeHandler = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      try {
        setFile(selectedFile);
        const dataUrl = await readFileAsDataURL(selectedFile);
        setImagePreview(dataUrl);
      } catch (error) {
        toast.error("Error loading image");
        setFile(null);
        setImagePreview("");
      }
    }
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    
    if (!caption.trim() && !file) {
      toast.error("Please add a caption or image");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption.trim());
    if (file) formData.append("image", file);

    try {
      setLoading(true);
      
      const res = await axios.post('http://localhost:8080/api/v1/post/addpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (res.data.success) {
        // Add the new post to the existing posts
        const newPosts = [res.data.post, ...posts];
        dispatch(setPosts(newPosts));
        
        toast.success(res.data.message);
        
        // Reset form and close dialog
        resetForm();
        setOpen(false);
      } else {
        toast.error(res.data.message || "Failed to create post");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error.response?.data?.message || "Failed to create post");
      setLoading(false);
    }
  };

  // When dialog is closed, reset the form
  const handleDialogClose = (isOpen) => {
    if (!isOpen) {
      resetForm();
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="text-center font-semibold">Create New Post</DialogHeader>
        <form onSubmit={createPostHandler}>
          <div className='flex gap-3 items-center'>
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt={user?.username} />
              <AvatarFallback>{user?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className='font-semibold text-xs'>{user?.username || user?.fullname}</h1>
            </div>
          </div>

          <Textarea 
            value={caption} 
            onChange={(e) => setCaption(e.target.value)} 
            className="focus-visible:ring-transparent border-none mt-4" 
            placeholder="Write a caption..." 
            disabled={loading}
          />

          {imagePreview && (
            <div className='w-full max-h-64 my-4 overflow-hidden'>
              <img 
                src={imagePreview} 
                alt="preview" 
                className='object-contain w-full h-full rounded-md' 
              />
            </div>
          )}

          <input 
            ref={imageRef} 
            type='file' 
            accept="image/*"
            className='hidden' 
            onChange={fileChangeHandler}
            disabled={loading}
          />

          <div className="flex flex-col gap-4 mt-4">
            <Button 
              type="button"
              onClick={() => imageRef.current?.click()} 
              variant="outline"
              className='w-full'
              disabled={loading}
            >
              Select from computer
            </Button>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || (!caption.trim() && !file)}
            >
              {loading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Creating post...
                </>
              ) : 'Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;