import express from "express";
import { urlModel } from "../model/shortUrl";

export const createShortUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { fullUrl } = req.body;
    const foundUrl = await urlModel.find({ fullUrl });
    if (foundUrl.length > 0) {
      res.status(409);
      res.send(foundUrl);
    } else {
      const shortUrl = await urlModel.create({ fullUrl });
      res.status(201).send(shortUrl);
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

export const getAllShortUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await urlModel.find();

    if (shortUrls.length < 0) {
      res.status(404).send({ message: "shortUrls not found" });
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

export const getShortUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    if (!shortUrl) {
      res.status(404).send({ message: "Full url not found" });
    } else {
      shortUrl.clicks++;
      shortUrl.save();
      res.redirect(`${shortUrl.fullUrl}`);
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};

export const deleteShortUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
    if (shortUrl) {
      res.status(204).send({ message: "Requested url successfully deleted" });
    }
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};
