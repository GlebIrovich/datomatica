from woocommerce import API
import random
import threading
def random_data():
    product_id = [9, 10, 11]
    return {
            "payment_method": "bacs",
            "payment_method_title": "Direct Bank Transfer",
            "set_paid": True,
            "line_items": [
                {
                    "product_id": random.choice(product_id),
                    "quantity": random.choice([1,2,3])
                },
            ]
        }


def generate_orders(reps, n_threads):
    
    user = {
            'url'  : "http://localhost:8888/masterthesis/",
            'consumer_key': "ck_c07ec3b0c68d920e4f61b718c629b3451f670f57",
            'consumer_secret' : "cs_df0ef7d370b094ca5d3a6ab28795b54549d99dce",
        }

    wcapi = API(
        url=user['url'],
        consumer_key=user['consumer_key'],
        consumer_secret=user['consumer_secret'],
        wp_api=True,
        version="wc/v1"
    )

    for i in range(reps):
        
        print('ROUND {}!'.format(i+1))
        def apicall(text, data):
            id = wcapi.post("orders", data).json()['id']

            data = {
                "status": "completed"
            }
            print(text)
            print(wcapi.put("orders/{}".format(id), data).status_code)

        try:
            threads = []
            for n in range(n_threads):
                thread = threading.Thread(target=apicall, args=("Thread-{}".format(n), random_data()))
                threads.append(thread)
                thread.start()
           
            for thread in threads:  # iterates over the threads
                thread.join()

        except:
            print("Error: unable to start thread")
            pass

if __name__ == '__main__':
    generate_orders(1000,10)
        