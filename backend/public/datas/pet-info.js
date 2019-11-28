const defaultHappinessBonus = {
  "favorate2": {"value": 15, "reason": "[petName] loves it sooooo much!"},
  "favorate1": {"value": 12, "reason": "[petName] does love it!"},
  "favorate": {"value": 10, "reason": "[petName] loves it!"},
  "good": {"value": 8, "reason": "[petName] thinks it is good"},
  "fair": {"value": 5, "reason": "[petName] thinks it just so so"},
  "dislike": {"value": 2, "reason": "[petName] seems don't like this"},
  "dislike1": {"value": 0, "reason": "[petName] doesn't like it"},
  "dislike2": {"value": -3, "reason": "[petName] hates it!!"}
};

const defaultNonDemandHappinessBonus = {
  "feed_1": {"value": 1, "reason": "[petName] is happy for your attention, but feeding too much is not good to its body"},
  "walk_1": {"value": 0, "reason": "[petName] is very tired and wants to stay at home"},
  "play_1": {"value": 2, "reason": "[petName] wants to play with you at any time"}
};

const petTags = {
  "species": {
    "question": "Which species do you prefer?",
    "choices": {"cat": "cat", "dog": "dog"}
  },
  "age": {
    "question": "What age do you prefer?",
    "choices": {"young": "young", "mature": "mature"}
  }
}

const petInfo =
{
  // petName
  "Frankie":
  {
    //tag
    "tag":
      {
        "species": petTags.species.choices.dog,
        "age": petTags.age.choices.young
      },
    //description
    "description": "Frankie is a one year old puppy. He loves...",
    // type
    "feed":
      {
        "demand":
          [
            {
              "tips": "[petName] wants to have breakfast at [startTime], and...",
              "startTime": "01:00:00",
              "endTime": "02:00:00",
              "happinessBonus":
                [
                  defaultHappinessBonus.favorate,
                  defaultHappinessBonus.fair,
                  {"value": 3, "reason": "[petName] has little and leave"},
                  defaultHappinessBonus.dislike2
                ]
            },
            {
              "tips": "[petName] wants to have snacks at [startTime], and...",
              "startTime": "15:00:00",
              "endTime": "16:00:00",
              "happinessBonus":
                [
                  defaultHappinessBonus.fair,
                  defaultHappinessBonus.fair,
                  defaultHappinessBonus.favorate1,
                  defaultHappinessBonus.dislike2
                ]
            },
            {
              "tips": "Protein is important to [petName]!",
              "startTime": "18:00:00",
              "endTime": "19:00:00",
              "happinessBonus":
                [
                  defaultHappinessBonus.dislike1,
                  defaultHappinessBonus.favorate2,
                  defaultHappinessBonus.dislike1,
                  defaultHappinessBonus.dislike1
                ]
            }
          ],
        "nondemand":
        {
          "tips": "[petName] is not hungry",
          "startTime": "00:00:00",
          "endTime": "24:00:00",
          "happinessBonus":
            [
              defaultNonDemandHappinessBonus.feed_1,
              defaultNonDemandHappinessBonus.feed_1,
              defaultNonDemandHappinessBonus.feed_1,
              defaultNonDemandHappinessBonus.feed_1
            ]
        }
      },
    // type
    "play":
      {
        "demand":
          [
            {
              "tips": "[petName] wants to play with you, and...",
              "startTime": "18:00:00",
              "endTime": "23:00:00",
              "happinessBonus":
                [
                  defaultHappinessBonus.favorate,
                  defaultHappinessBonus.fair,
                  defaultHappinessBonus.favorate1,
                  defaultHappinessBonus.dislike2
                ]
            }
          ],
        "nondemand":
          {
            "tips": "[petName] enjoy playing with you!",
            "startTime": "00:00:00",
            "endTime": "24:00:00",
            "happinessBonus":
              [
                defaultNonDemandHappinessBonus.play_1,
                defaultNonDemandHappinessBonus.play_1,
                defaultNonDemandHappinessBonus.play_1,
                defaultNonDemandHappinessBonus.play_1
              ]
          }
      },
    // type
    "walk":
      {
        "demand":
          [
            {
              "tips": "[petName] wants to have a walk at [startTime], and...",
              "startTime": "19:00:00",
              "endTime": "22:00:00",
              "happinessBonus":
                [
                  defaultHappinessBonus.favorate,
                  defaultHappinessBonus.fair,
                  defaultHappinessBonus.favorate1,
                  defaultHappinessBonus.dislike2
                ]
            }
          ],
        "nondemand":
          {
            "tips": "[petName] doesn't want to go outside",
            "startTime": "00:00:00",
            "endTime": "24:00:00",
            "happinessBonus":
              [
                defaultNonDemandHappinessBonus.walk_1,
                defaultNonDemandHappinessBonus.walk_1,
                defaultNonDemandHappinessBonus.walk_1,
                defaultNonDemandHappinessBonus.walk_1
              ]
          }
      }
  },
  // petName
  "Mikky":
    {
      //tag
      "tag":
      {
        "species": petTags.species.choices.cat,
        "age": petTags.age.choices.mature
      },
      //description
      "description": "Mikky is a five years old kitty. She loves...",
      // type
      "feed":
        {
          "demand":
            [
              {
                "tips": "[petName] wants to have breakfast at [startTime], and...",
                "startTime": "01:00:00",
                "endTime": "02:00:00",
                "happinessBonus":
                  [
                    defaultHappinessBonus.favorate,
                    defaultHappinessBonus.fair,
                    {"value": 3, "reason": "[petName] has little and leave"},
                    defaultHappinessBonus.dislike2
                  ]
              },
              {
                "tips": "[petName] wants to have snacks at [startTime], and...",
                "startTime": "15:00:00",
                "endTime": "16:00:00",
                "happinessBonus":
                  [
                    defaultHappinessBonus.fair,
                    defaultHappinessBonus.fair,
                    defaultHappinessBonus.favorate1,
                    defaultHappinessBonus.dislike2
                  ]
              },
              {
                "tips": "Protein is important to [petName]!",
                "startTime": "18:00:00",
                "endTime": "19:00:00",
                "happinessBonus":
                  [
                    defaultHappinessBonus.dislike1,
                    defaultHappinessBonus.favorate2,
                    defaultHappinessBonus.dislike1,
                    defaultHappinessBonus.dislike1
                  ]
              }
            ],
          "nondemand":
            {
              "tips": "[petName] is not hungry",
              "startTime": "00:00:00",
              "endTime": "24:00:00",
              "happinessBonus":
                [
                  defaultNonDemandHappinessBonus.feed_1,
                  defaultNonDemandHappinessBonus.feed_1,
                  defaultNonDemandHappinessBonus.feed_1,
                  defaultNonDemandHappinessBonus.feed_1
                ]
            }
        },
      // type
      "play":
        {
          "demand":
            [
              {
                "tips": "[petName] wants to play with you, and...",
                "startTime": "18:00:00",
                "endTime": "23:00:00",
                "happinessBonus":
                  [
                    defaultHappinessBonus.favorate,
                    defaultHappinessBonus.fair,
                    defaultHappinessBonus.favorate1,
                    defaultHappinessBonus.dislike2
                  ]
              }
            ],
          "nondemand":
            {
              "tips": "[petName] enjoy playing with you!",
              "startTime": "00:00:00",
              "endTime": "24:00:00",
              "happinessBonus":
                [
                  defaultNonDemandHappinessBonus.play_1,
                  defaultNonDemandHappinessBonus.play_1,
                  defaultNonDemandHappinessBonus.play_1,
                  defaultNonDemandHappinessBonus.play_1
                ]
            }
        },
      // type
      "walk":
        {
          "demand":
            [
              {
                "tips": "[petName] wants to have a walk at [startTime], and...",
                "startTime": "19:00:00",
                "endTime": "22:00:00",
                "happinessBonus":
                  [
                    defaultHappinessBonus.favorate,
                    defaultHappinessBonus.fair,
                    defaultHappinessBonus.favorate1,
                    defaultHappinessBonus.dislike2
                  ]
              }
            ],
          "nondemand":
            {
              "tips": "[petName] doesn't want to go outside",
              "startTime": "00:00:00",
              "endTime": "24:00:00",
              "happinessBonus":
                [
                  defaultNonDemandHappinessBonus.walk_1,
                  defaultNonDemandHappinessBonus.walk_1,
                  defaultNonDemandHappinessBonus.walk_1,
                  defaultNonDemandHappinessBonus.walk_1
                ]
            }
        }
    }
};

exports.petInfo = petInfo;
exports.petTags = petTags;
