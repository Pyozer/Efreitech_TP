import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import scipy
from sklearn import linear_model # Le modèle linéaire
from sklearn import datasets
from sklearn.metrics import mean_squared_error, r2_score # Métriques d'évaluation
import seaborn as sns

def linearReg():
    datasource = pd.read_excel(r'./data/slr04.xls')
    datasource = datasource.rename(columns={
        "X": "Males",
        "Y": "Females",
    })
    print(datasource)

    X_train = np.expand_dims(datasource['Males'], axis=1)
    Y_train = datasource['Females']

    print(X_train)
    print(Y_train)

    #sns.set(rc={'figure.figsize': (10, 3)})
    #sns.scatterplot(X_train[:, 0], Y_train)

    regr = linear_model.LinearRegression()
    regr_fit = regr.fit(X_train, Y_train, sample_weight=None)

    print(f'Intercept: \t{regr.intercept_}')
    print(f'Coefficients: \t{regr.coef_}')

    #plt.figure(figsize=(10,7))
    #plt.scatter(X_train, Y_train)
    #plt.plot([0,10], regr.predict([[0], [10]]), color='red')
    #plt.show()
    Y_pred = regr.predict(X_train)

    mse = mean_squared_error(Y_train, Y_pred)
    score = r2_score(Y_train, Y_pred) * 100

    print("MSE : {:3.2f}".format(mse))
    print('Score R2: {:2.1f}%'.format(score))
    
    return {
        "mse": mse,
        "score": score
    }
