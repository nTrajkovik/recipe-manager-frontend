import React, { createContext, useEffect, useState } from "react";
import Api from "../Api";
import { toast } from "react-toastify";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const fetchTags = async () => {
    try {
        const response = await Api().get("/api/tags");
        if (response.data) {
            setTags(response.data);
        } else {
            console.log(`No data from server`);
        }
    } catch (error) {
      console.error(`Error fetching tags: `, error);
    }
  };

  const addTag = async (newTag) => {
    try {
        const response = await Api().put("/api/tags", newTag);
        console.log({data: response.data})
        if (response.data) {
            // setTags(oldTags => [...oldTags, response.data])
            fetchTags();
            toast("Success!");
            return true;
        }
    } catch (error) {
        toast("Not saved new tag!");
        console.error("Error adding tag: ", error)
    }
    return false;
  };

  const removeTag = async (tagValue) => {
    try {
        const response = await Api().delete(`/api/tags/${tagValue}`);
        if (response.data) {
            fetchTags();
            toast("Success!");
        }
    } catch (error) {
        console.error("Error deleting tag: ", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const vals = { tags, addTag, removeTag };
  return <TagContext.Provider value={vals}>{children}</TagContext.Provider>;
};
