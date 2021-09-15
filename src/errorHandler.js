export const badreqFoundErrHandl = (err, req, res, next) => {
  if (err.status == 400) {
    res.status(400).send("Bad request!");
  } else {
    next(err);
  }
};
export const notFoundErrHandl = (err, req, res, next) => {
  if (err.status == 404) {
    res.status(404).send(err.message);
  } else {
    next(err);
  }
};
export const forbiddenFoundErrHandl = (err, req, res, next) => {
  if (err.status == 402) {
    res.status(402).send("Forbidden!");
  } else {
    next(err);
  }
};
export const genericErrHandl = (err, req, res, next) => {
  if (err.status == 500) {
    res.status(500).send("Generic server error!");
  } else {
    next(err);
  }
};
