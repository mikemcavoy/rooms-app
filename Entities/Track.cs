using System;
using System.Collections.Generic;

namespace api.Entities
{
    public class Track
    {
        public string id { get; set; }
        public string name { get; set; }
        public int duration { get; set; }
        public IEnumerable<Artist> artists { get; set; }
        public Album album { get; set; }

        public class Album
        {
            public string id { get; set; }
            public string name { get; set; }
            public IEnumerable<AlbumArt> images { get; set; }
        }
        public class Artist
        {
            public string id { get; set; }
            public string name { get; set; }
        }
        public class AlbumArt
        {
            public int height { get; set; }
            public int width { get; set; }
            public string url { get; set; }
        }
    }
}
