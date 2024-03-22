import mongoose from "mongoose";
import {Playlist} from "../models/playlist.model.js";
import {ApiError} from "../utils/errorHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


import asyncHandler from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {})

const getUserPlaylists = asyncHandler(async (req, res) => {})

const getPlayListById = asyncHandler(async (req, res) => {})

const addVideoToPlaylist = asyncHandler(async (req, res) => {})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {})

const deletePlaylist = asyncHandler(async (req, res) => {})

const updatePlaylist = asyncHandler(async (req, res) => {})

export{
    createPlaylist,
    getUserPlaylists,
    getPlayListById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
