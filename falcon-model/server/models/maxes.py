import pandas as pd
from server.db_functions import fetch_data, delete_data, engine
from server.db.schema import MaxesModel as ModelObject, Transactions

class MaxesModel(object):
    def __init__(self, id):
        self.model = ModelObject
        self.transactions = Transactions
        self.user_id = id
        self.df = self._fetch_transactions()
        self.newDf = pd.DataFrame(columns=['TotalTransactions', 'MaxBill', 'user_id'])
        
    def _fetch_transactions(self):
        return fetch_data(self.user_id, self.transactions)
    
    def _store(self, df):
        df.to_sql('maxes_model', con=engine, index=False, if_exists='append')

    def _clear_old(self):
        delete_data(self.user_id, self.model)

    def get_existing_results(self):
        return fetch_data(self.user_id, self.model).to_dict('split')

    def analyze(self):

        if(self.df is not None):
            self.newDf = self.newDf.append({
                'MaxBill': self.df['total'].max(),
                'TotalTransactions': self.df['total'].count(),
                'user_id': self.user_id
            },
            ignore_index=True)

            if not self.newDf.empty:
                self._clear_old()
                self._store(self.newDf)

            return self.newDf.to_dict('split')
        else:
            print('No data found')
            return ''


    