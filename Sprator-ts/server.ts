import express from 'express';
import { generate } from '.';

const app = express();

app.get('*', (req, res) => {
  try {
    const { background, border, dot, fill, ppd, seed } = validate(req.query);
    console.log({ background, border, dot, fill, ppd, seed });
    try {
      const buffer = generate(seed, dot, ppd, fill, border, background, 2);
      res.type('png');
      res.send(buffer);
    } catch (error) {
      // Unexpected error was occured.
      console.error(error);
      res.sendStatus(500);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
}

type Query = {
  [key: string]: undefined | string | string[];
};

export function validate(query: Query) {
  const str = (key: string, defaultValue: string) => {
    const rawValue = query[key];
    return rawValue === undefined
      ? defaultValue
      : Array.isArray(rawValue)
      ? rawValue[0]
      : rawValue;
  };
  const int = (key: string, defaultValue: number) => {
    const rawValue = query[key];
    const value =
      rawValue === undefined
        ? defaultValue
        : parseInt(Array.isArray(rawValue) ? rawValue[0] : rawValue, 10);
    if (Number.isNaN(value)) {
      throw new Error(`${key} must be number but given ${value}`);
    }
    return value;
  };

  const seed = str('seed', '040f1148');
  if (Number.isNaN(Number.parseInt(seed, 16))) {
    throw new Error(`seed must be hex but given ${seed}`);
  }

  const dot = int('dot', 10);
  if (dot < 6 || dot > 12) {
    throw new Error(`dot must be between 6 and 12 but given ${dot}`);
  }
  if (dot % 2 !== 0) {
    throw new Error(`dot must be even number but given ${dot}`);
  }

  const ppd = int('ppd', 16);
  if (ppd < 1 || ppd > 1024) {
    throw new Error(`ppd must be between 1 and 1024 but given ${ppd}`);
  }

  const fill = str('fill', '#228b22');
  const border = str('border', '#2f4f4f');
  const background = str('background', '#000000');

  return { seed, dot, ppd, fill, border, background };
}
