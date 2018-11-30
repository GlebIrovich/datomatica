from server.db.schema import MaxesModel, Users, Transactions
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from server.settings import settings
from server.db_functions import Session, engine
from datetime import datetime
import random
import uuid


class DB(object):

    def __init__(self):
        self._add_user()
        self._populate(Transactions, self._generate_data_transactions())
        self._populate(MaxesModel, self._generate_data_maxes())


    def _start_session(self):
        self.session = Session()

    def delete_user(self):
        self._start_session()

        result = self.session.query(Users).filter_by(id = self.user_id).delete(synchronize_session=False)
        if result > 0 :
            self.session.commit()
            print('\nUser deleted')
        else:
            print('\nNo user')

        self.session.close()

    def _add_user(self):
        print('\nCreating user')
        data = self._generate_data_user()
        self._populate(Users, data)
        

    def _generate_data_user(self):
        self.user_id = str(uuid.uuid1())
        return [{
            "id" : self.user_id,
            "username":     'test',
            "password":     'test',
            "name":         'test',
            "last_name":    'test',
            "email":        'mail@mail'
        }]


    def _generate_data_transactions(self):
        return [
            {
                "order_key": str(random.randint(1000, 5000)),
                "customer_id": random.randint(0,10), 
                "date_created": datetime.now(), 
                "total": str(random.randint(100, 500)), 
                "user_id": self.user_id,
            }
            for x in range(100)
        ]
        
    def _generate_data_maxes(self):

        return [
            {
                'TotalTransactions': random.randint(100, 200),
                'MaxBill': random.randint(100, 200),
                'user_id': self.user_id
            }
            for x in range(100)
        ]


    def _populate(self, model, data):
        
        engine.execute(
            model.__table__.insert(),
            data
        )