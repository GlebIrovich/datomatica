# import pandas as pd
# import numpy as np

# class RFMModel(object):
#     def __init__(self, df):
#         self.df = df

#     def _prepare_df(self):
#         self.df["date_created"] = pd.to_datetime(myData["date_created"], format="%d.%m.%Y", utc=True)

#     def analyze(self):
#         myData = pd.read_csv('media/'+file_name, delimiter=',')
#         myData["TransDate"] = pd.to_datetime(myData["TransDate"], format="%d.%m.%Y", utc=True)

#         max_Date = pd.DataFrame({"max_Date": np.repeat(max(myData["TransDate"]), repeats=len(myData["TransDate"]))})

#         rfm = myData.groupby("Customer", as_index=False).agg(
#             {"TransDate": "max", "TransID": "count", "PurchAmount": "mean"})
#         rfm["Recency"] = (max_Date["max_Date"] - rfm["TransDate"]).dt.days
#         rfm.columns = ["CustomerID", "LastTransDate", "Frequency", "Value", "Recency"]

#         rfm["RecRank"] = pd.cut(rfm["Recency"], bins=[-1, 700, 1700, 3000], labels=["3", "2", "1"]).astype(int)
#         rfm["FreqRank"] = pd.cut(rfm["Frequency"], bins=[-1, 2, 5, 100], labels=["1", "2", "3"]).astype(int)
#         rfm["ValueRank"] = pd.cut(rfm["Value"], bins=[-1, 50, 100, 10000], labels=["1", "2", "3"]).astype(int)
#         weight_sum = weight_rec + weight_freq + weight_value
#         rfm["Overall Score"] = (rfm["RecRank"] * weight_rec + rfm["FreqRank"] * weight_freq + rfm[
#             "ValueRank"] * weight_value) / weight_sum

#         rfm["Group"] = rfm["Overall Score"].round(0).astype(int)

#         result = rfm[["CustomerID", "RecRank", "FreqRank", "ValueRank", "Overall Score", "Group"]]
#         name = 'user_' + str(id) + '/' + str(id) + '_done_' + randomword(10) + '.csv'
#         result.to_csv('media/' + name, sep=',')
#         return name



    # weight_rec = float(weight_rec)
    # weight_freq = float(weight_freq)
    # weight_value = float(weight_value)
    # if (weight_rec + weight_freq + weight_value != 1):
    #     w1 = weight_rec
    #     w2 = weight_freq
    #     w3 = weight_value
    #     w_sum = w1 + w2 + w3
    #     weight_rec = w1 / w_sum
    #     weight_freq = w2 / w_sum
    #     weight_value = w3 / w_sum

    