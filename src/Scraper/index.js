// @flow
import cheerio from 'cheerio';
import fetch from 'node-fetch';

export async function getProfile(username: string, retry: number = 2) {
  try {
    const fetchResult = await fetch(`https://traewelling.de/profile/${username}`);

    return fetchResult.text();
  } catch (e) {
    if (retry > 0) {
      return getProfile(username, retry - 1);
    }
    throw e;
  }
}

const splitTimeAndValueRegex = /(.*) \((.*)\)$/;

export function getLastTrain($: any) {
  const lastTrainsTable = $('table > tbody > tr');
  const lastTrain = lastTrainsTable.first().find('> td');
  let train = {};
  let from = {};
  let to = {};

  if (lastTrain.length >= 3) {
    const trainResult = splitTimeAndValueRegex.exec($(lastTrain[0]).text());
    const fromResult = splitTimeAndValueRegex.exec($(lastTrain[1]).text());
    const toResult = splitTimeAndValueRegex.exec($(lastTrain[2]).text());

    if (trainResult) {
      train = {
        train: trainResult[1],
        date: trainResult[2],
      };
    }

    if (fromResult) {
      from = {
        station: fromResult[1],
        time: fromResult[2],
      };
    }

    if (toResult) {
      to = {
        station: toResult[1],
        time: toResult[2],
      };
    }
  }

  return {
    train: train?.train,
    date: train?.date,
    from,
    to,
  };
}

export function getCurrentLocation(html: string) {
  const $ = cheerio.load(html);
  const currentlyTravellingSection = $('.col-lg-12 > h5');

  return {
    ...getLastTrain($),
    currentlyTravelling: Boolean(currentlyTravellingSection.length),
  };
}

export async function getInformation(username: string) {
  const profile = await getProfile(username);

  return getCurrentLocation(profile);
}
