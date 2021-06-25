# -*- coding: utf-8 -*-
"""recommendor.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1zUk1W9RnA89ELZ9McTAMdPr2xgrktLUX
"""



import pandas as pd
# import numpy as np
import json
import sys
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

rlist=[]
length=len(sys.argv)
for i in range(1,length):
    rlist.append(json.loads(sys.argv[i]))



dfnew=pd.DataFrame(rlist)
cstring=sys.stdin.read()
castlist=cstring.split('ssss')


calist=[]

for r in range(0,len(castlist)-1):
    calist.append(json.loads(castlist[r]))

cdf=pd.DataFrame(calist)
# cdf.columns=['id','title','cast','crew']
cdf = cdf.rename(columns = {"id":"movie_id"})



df1=pd.read_csv('../tmdb_5000_movies.csv')
df2=pd.read_csv('../tmdb_5000_credits.csv')


ty=dfnew['original_title'].values.tolist()

# null=None
# false=False
# true=True


df1=df1.drop(['keywords'], axis = 1)


df1=df1.append(dfnew,ignore_index = True)
df2=df2.append(cdf,ignore_index = True)

df2.columns=['id','title','cast','crew']
df1=df1.merge(df2,on='id')

# print(df2)

# #get coun
# df1['crew']

l=[]

for t in range(0,len(df1['crew'])):
  d=[]
  x=df1['crew'][t]
  try:
    res = json.loads(x)
  except:
    v=json.dumps(x)
    res=json.loads(v)
  count=0
  
  for i in res:
    
    if(i['job']=='Director' ):
      count+=1
      d.append(i['name'])
         
  l.append(d)


dr=[]

for d in l:
  try:
    dr.append(d[0])
  except:
    dr.append('null')

df1['directors']=dr

gen=[]
for z in range(0,len(df1['genres'])):
  d=[]
  x=df1['genres'][z]
  try:
    res = json.loads(x)
  except:
    v=json.dumps(x)
    res=json.loads(v)
  for i in res:
    d.append(i['name'])
    tst=','.join(d)
  gen.append(tst)



df1['genre']=gen
df1['genre']

act=[]
for z in range(0,len(df1['cast'])):
  d=[]
  x=df1['cast'][z]
  try:
    res = json.loads(x)
  except:
    v=json.dumps(x)
    res=json.loads(v)
  for i in res:
    d.append(i['name'])
    tst=','.join(d)
  act.append(tst)



df1['actors']=act
df1['actors']

column=['actors','directors','genre','title_x']
df1[column]

def get_important_features(data):
  impf=[]
  for i in range(0,data.shape[0]):
    impf.append(data['actors'][i]+' '+data['directors'][i]+' '+data['genre'][i]+' '+data['title_x'][i])
  return impf

df1['important']=get_important_features(df1)

cm=CountVectorizer().fit_transform(df1['important'])

cs=cosine_similarity(cm)

finid=[]
for o in range(0,len(ty)):

    title=ty[o]
    index=df1.index
    condition=df1['title_x']==title
    movie_id=index[condition]

    scores=list(enumerate(cs[movie_id[0]]))


    sortedscr=sorted(scores,key=lambda x:x[1],reverse=True)



    # print('Seven Most recommended movies to',title)
    j=0
    movlistf=[]
    for item in sortedscr:
    
    
    
        x=df1.iloc[item[0]]['id']
        print(x,end=" ")
        j=j+1
        if j>4:
            break
