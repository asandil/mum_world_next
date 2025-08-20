import axios from "axios";

const baseuri = import.meta.env.base_uri;

export const blogList = async (i) => {
    try {
        const response = await axios.get(`${baseuri}/blogs?page=${i}`);
        return response;
    } catch (error) {
        console.log('error while fetching blogList');
    }
}

export const blog = async (node) => {
    try {
        const response = await axios.get(`${baseuri}${node}/json`);
        return response.data;
    } catch (error) {
        console.log("error while fetching blogdata");
    }
}

export const getCategory = async () => {
    try {
        const response = await axios.get(`${baseuri}/category/list.json`);
        return response.data;
    } catch (error) {
        console.log("error while fetching categoryList");
    }
}

export const categoryData = async (tid, page) => {
    try {
        const response = await axios.get(`${baseuri}/blogs/category/${tid}?page=${page}`);
        return response.data;
    } catch (error) {
        console.log("error while fetching categoryData");
    }
}

export const recentPosts = async () => {
    try {
        const response = await axios.get(`${baseuri}/recent-post.json`);
        return response.data;
    } catch (error) {
        console.log("error while fetching recentposts");
    }
}