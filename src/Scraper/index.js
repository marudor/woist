// @flow
import cheerio from 'cheerio';
import fetch from 'node-fetch';

export function getProfile(username: string) {
  return fetch(`https://traewelling.de/profile/${username}`).then(res => res.text());
}

const splitTimeAndValueRegex = /(.*) \((.*)\)$/;

export function getLastTrain($: any) {
  const lastTrainsTable = $('table > tbody > tr');
  const lastTrain = lastTrainsTable.first().find('> td');

  if (lastTrain.length >= 3) {
    const trainResult = splitTimeAndValueRegex.exec($(lastTrain[0]).text());
    const fromResult = splitTimeAndValueRegex.exec($(lastTrain[1]).text());
    const toResult = splitTimeAndValueRegex.exec($(lastTrain[2]).text());
    let train;

    if (trainResult) {
      train = {
        train: trainResult[1],
        date: trainResult[2],
      };
    }
    let from;

    if (fromResult) {
      from = {
        station: fromResult[1],
        time: fromResult[2],
      };
    }
    let to;

    if (toResult) {
      to = {
        station: toResult[1],
        time: toResult[2],
      };
    }

    return {
      train: train && train.train,
      date: train && train.date,
      from,
      to,
    };
  }
}

export function getCurrentLocation(html: string) {
  const $ = cheerio.load(html);
  const currentlyTravellingSection = $('.col-lg-12 > h5');

  return Object.assign({}, getLastTrain($), {
    currentlyTravelling: Boolean(currentlyTravellingSection.length),
  });
}

export async function getInformation(username: string) {
  const profile = await getProfile(username);

  return getCurrentLocation(profile);
}