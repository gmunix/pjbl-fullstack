DROP DATABASE IF EXISTS jammming;
CREATE DATABASE jammming CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE jammming;

CREATE TABLE albums (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  artist VARCHAR(150) NOT NULL,
  genre VARCHAR(80) NOT NULL,
  release_year INT NOT NULL,
  label VARCHAR(120) NULL,
  cover_url VARCHAR(255) NULL,
  tracks_count INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO albums (title, artist, genre, release_year, label, cover_url, tracks_count) VALUES
  ('OK Computer', 'Radiohead', 'Alternative Rock', 1997, 'Parlophone', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/07/60/ba/0760ba0f-148c-b18f-d0ff-169ee96f3af5/634904078164.png/600x600bb.jpg', 12),
  ('A Moon Shaped Pool', 'Radiohead', 'Alternative Rock', 2016, 'XL Recordings', 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b7/f2/5d/b7f25d91-4320-47c8-146a-6f84d5bc7e78/cover.jpg/600x600bb.jpg', 11),
  ('In Rainbows', 'Radiohead', 'Alternative Rock', 2007, 'XL Recordings', 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/dd/50/c7/dd50c790-99ac-d3d0-5ab8-e3891fb8fd52/634904032463.png/600x600bb.jpg', 10),
  ('The Bends', 'Radiohead', 'Alternative Rock', 1995, 'Parlophone', 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1b/a9/5c/1ba95cac-b245-d386-63fb-6b857aa9dce8/634904078065.png/600x600bb.jpg', 12),
  ('Justice', 'Justice', 'Electronic', 2007, 'Ed Banger Records', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/62/e4/01/62e40187-e672-17e5-f31f-9aee262703a3/mzi.bifzeufu.jpg/600x600bb.jpg', 12),
  ('Luz', 'Djavan', 'MPB', 1982, 'CBS', 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a1/7e/31/a17e31a0-1969-6d81-4e6c-6eb4e9492d73/5099747630224.jpg/600x600bb.jpg', 10),
  ('Lilás', 'Djavan', 'MPB', 1984, 'CBS', 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/30/75/31/30753193-7553-436f-93b0-29e8af33e003/884977966473.jpg/600x600bb.jpg', 9),
  ('Discovery', 'Daft Punk', 'French House', 2001, 'Virgin Records', 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fd/4a/77/fd4a77db-0ebc-d043-41a2-f32fa1bb0fb4/dj.qrikkdwj.jpg/600x600bb.jpg', 14),
  ('Random Access Memories', 'Daft Punk', 'Electronic', 2013, 'Columbia', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e8/43/5f/e8435ffa-b6b9-b171-40ab-4ff3959ab661/886443919266.jpg/600x600bb.jpg', 14),
  ('The New Abnormal', 'The Strokes', 'Indie Rock', 2020, 'RCA Records', 'https://cdn-images.dzcdn.net/images/cover/f8a0a2e1ec12c1026cd03208237cd934/1000x1000-000000-80-0-0.jpg', 9),
  ('Is This It', 'The Strokes', 'Indie Rock', 2001, 'RCA Records', 'https://cdn-images.dzcdn.net/images/cover/700f0375d5ac8570f16a2c7eb128303f/1000x1000-000000-80-0-0.jpg', 11),
  ('Love Deluxe', 'Sade', 'R&B/Soul', 1992, 'Epic', 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/18/c8/d7/18c8d7bc-8491-09e6-df0d-6e0a83ead680/mzi.wsikzifg.jpg/600x600bb.jpg', 9),
  ('Untrue', 'Burial', 'Electronic', 2007, 'Hyperdub', 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/9d/0f/1c/9d0f1c2b-2fae-d8ac-3920-ce9ec5bc85b5/7982.jpg/600x600bb.jpg', 13),
  ('Bicep', 'BICEP', 'Electronic', 2017, 'Ninja Tune', 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/79/cf/44/79cf445f-4b04-7a27-54a4-cdf57cf1d6ac/5054429119084.png/600x600bb.jpg', 12),
  ('The Dark Side of the Moon', 'Pink Floyd', 'Progressive Rock', 1973, 'Harvest', 'https://cdn-images.dzcdn.net/images/cover/e635a8510c1a74bc089b3566ebbb9cb8/1000x1000-000000-80-0-0.jpg', 10),
  ('Call Me If You Get Lost', 'Tyler, The Creator', 'Hip-Hop/Rap', 2021, 'Columbia', 'https://cdn-images.dzcdn.net/images/cover/2d740784396546039fe626ac2b92877b/1000x1000-000000-80-0-0.jpg', 16),
  ('IGOR', 'Tyler, The Creator', 'Hip-Hop/Rap', 2019, 'Columbia', 'https://cdn-images.dzcdn.net/images/cover/041ab5ceb6fb6ebf9512966835be9e1b/1000x1000-000000-80-0-0.jpg', 12),
  ('To Pimp a Butterfly', 'Kendrick Lamar', 'Hip-Hop/Rap', 2015, 'Top Dawg Entertainment', 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/b5/a6/91/b5a69171-5232-3d5b-9c15-8963802f83dd/15UMGIM15814.rgb.jpg/600x600bb.jpg', 17),
  ('Mr. Morale & The Big Steppers', 'Kendrick Lamar', 'Hip-Hop/Rap', 2022, 'pgLang', 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/6b/17/e6/6b17e679-70e0-e00e-93e1-5af4d25ee8c8/22UMGIM52376.rgb.jpg/600x600bb.jpg', 18),
  ('InnerSpeaker', 'Tame Impala', 'Psychedelic Rock', 2010, 'Modular Recordings', 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e2/45/28/e2452872-ff3d-a53b-847e-72361827d428/00602577163883.rgb.jpg/600x600bb.jpg', 11);
